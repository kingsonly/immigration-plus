// app/tools/[slug]/page.tsx
import { notFound } from "next/navigation";

export default async function ToolDetailPage({ params }: { params: { slug: string } }) {
  const base =
    process.env.NEXT_PUBLIC_STRAPI_URL ||
    process.env.STRAPI_URL ||
    "http://localhost:1337";
  const url = `${base.replace(/\/$/, "")}/api/tools?filters[slug][$eq]=${encodeURIComponent(
    params.slug
  )}&pagination[pageSize]=1`;

  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) notFound();

  const json = await res.json();
  const tool = json?.data?.[0];
  if (!tool) notFound();

  // --- Display placeholder page since tool is not yet built ---
  return (
    <div className="min-h-screen bg-white pt-16">
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl font-bold mb-4">{tool.name}</h1>
        {tool.description && (
          <p className="text-gray-600 mb-8">{tool.description}</p>
        )}

        {/* If an external placeholder link is provided in Strapi, use it */}
        {tool.link && /^https?:\/\//.test(tool.link) ? (
          <a
            href={tool.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/80 transition"
          >
            Open Tool
          </a>
        ) : (
          <div className="p-6 bg-gray-100 rounded-lg text-gray-700">
            🚧 This tool is <span className="font-semibold">coming soon</span>.
            Check back later!
          </div>
        )}
      </div>
    </div>
  );
}
