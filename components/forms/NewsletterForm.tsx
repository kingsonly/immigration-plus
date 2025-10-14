"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  source?: string;
  includeNameField?: boolean;
};

type Status = "idle" | "loading" | "success" | "error";

export default function NewsletterForm({ className, source, includeNameField = false }: Props) {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const email = String(formData.get("email") || "").trim();
    const name = String(formData.get("name") || "").trim();

    if (!email) {
      setStatus("error");
      setMessage("Please enter your email address.");
      return;
    }

    setStatus("loading");
    setMessage(null);

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-form-source": source ?? "newsletter-form",
        },
        body: JSON.stringify({
          email,
          name: name || undefined,
          source,
        }),
      });

      const body = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(body?.message || "We couldn't subscribe you right now.");
      }

      setStatus("success");
      setMessage(body?.message || "Thanks for subscribing!");
      form.reset();
    } catch (error: any) {
      setStatus("error");
      setMessage(error?.message || "We couldn't subscribe you right now.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className={cn("space-y-3", className)}>
      {includeNameField && (
        <Input
          type="text"
          name="name"
          placeholder="Your name (optional)"
          autoComplete="name"
          disabled={status === "loading"}
        />
      )}
      <div className="flex flex-col sm:flex-row gap-3">
        <Input
          type="email"
          name="email"
          placeholder="Enter your email address"
          autoComplete="email"
          required
          disabled={status === "loading"}
          className="bg-white"
        />
        <Button
          type="submit"
          className="bg-white text-red-600 hover:bg-gray-100 font-semibold"
          disabled={status === "loading"}
        >
          {status === "loading" ? "Subscribing..." : "Subscribe"}
        </Button>
      </div>
      {message && (
        <p
          className={cn(
            "text-sm",
            status === "error" ? "text-red-100" : "text-white"
          )}
        >
          {message}
        </p>
      )}
      {!message && (
        <p className="text-white/70 text-xs">
          No spam. Unsubscribe at any time.
        </p>
      )}
    </form>
  );
}
