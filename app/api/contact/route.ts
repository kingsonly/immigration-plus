// app/api/contact/route.ts
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

type Payload = {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  service?: string;
  message: string;
  // Honeypot
  company?: string;
};

function isEmail(s: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Payload;

    // Basic validation
    const errors: string[] = [];
    if (!body.firstName?.trim()) errors.push("First name is required");
    if (!body.lastName?.trim()) errors.push("Last name is required");
    if (!body.email?.trim() || !isEmail(body.email)) errors.push("Valid email is required");
    if (!body.message?.trim()) errors.push("Message is required");

    // Honeypot: reject if filled
    if (body.company && body.company.trim().length > 0) {
      return NextResponse.json({ ok: true }, { status: 200 });
    }

    if (errors.length) {
      return NextResponse.json({ ok: false, errors }, { status: 400 });
    }

    // Post to Strapi securely using server credentials
    const STRAPI_URL =
      process.env.NEXT_PUBLIC_STRAPI_URL || process.env.STRAPI_URL || "http://localhost:1337";
    const STRAPI_TOKEN = process.env.STRAPI_TOKEN || process.env.NEXT_PUBLIC_STRAPI_TOKEN;

    if (!STRAPI_TOKEN) {
      return NextResponse.json(
        { ok: false, error: "Missing STRAPI_TOKEN on server" },
        { status: 500 }
      );
    }

    // Create a contact-submission (no need to open public perms)
    const res = await fetch(`${STRAPI_URL.replace(/\/$/, "")}/api/inquiries`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${STRAPI_TOKEN}`,
      },
      body: JSON.stringify({
        data: {
          firstName: body.firstName,
          lastName: body.lastName,
          email: body.email,
          phone: body.phone || null,
          service: body.service || null,
          message: body.message,
          source: "website",
        },
      }),
      cache: "no-store",
    });

    if (!res.ok) {
      let detail: any = undefined;
      try {
        detail = await res.json();
      } catch {
        /* ignore */
      }
      return NextResponse.json(
        { ok: false, error: "Failed to persist in Strapi", detail },
        { status: 502 }
      );
    }

    await sendNotification(body).catch((err) => {
      console.error("Failed to send contact notification", err);
    });

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (e: any) {
    return NextResponse.json(
      { ok: false, error: e?.message || "Unexpected error" },
      { status: 500 }
    );
  }
}

function canSendEmail() {
  return (
    !!process.env.NEWSLETTER_NOTIFICATION_EMAIL &&
    !!process.env.SMTP_HOST &&
    !!process.env.SMTP_PORT &&
    !!process.env.SMTP_USER &&
    !!process.env.SMTP_PASS
  );
}

async function sendNotification(payload: Payload) {
  if (!canSendEmail()) return;

  const port = Number(process.env.SMTP_PORT);
  const secure = process.env.SMTP_SECURE === "true" || port === 465;

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port,
    secure,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const lines = [
    "New contact inquiry",
    "",
    `Name: ${payload.firstName} ${payload.lastName}`,
    `Email: ${payload.email}`,
    payload.phone ? `Phone: ${payload.phone}` : null,
    payload.service ? `Service: ${payload.service}` : null,
    "",
    "Message:",
    payload.message,
  ]
    .filter(Boolean)
    .join("\n");

  await transporter.sendMail({
    from: process.env.SMTP_FROM || process.env.SMTP_USER,
    to: process.env.NEWSLETTER_NOTIFICATION_EMAIL,
    subject: "New website inquiry",
    text: lines,
  });
}
