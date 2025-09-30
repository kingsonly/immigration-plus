import { notFound } from "next/navigation";
import { fetchStoryBySlug } from "@/lib/api/stories";
import { Card, CardContent } from "@/components/ui/card";

export const dynamic = "force-dynamic";

export default async function StoryDetail({ params }: { params: { slug: string } }) {
  const story = await fetchStoryBySlug(params.slug);
  if (!story) notFound();

  return (
    <div className="min-h-screen bg-white pt-16">
      <div className="max-w-3xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-2">{story.title}</h1>
        <p className="text-gray-600 mb-6">
          {story.country ? `From ${story.country} · ` : ""}{story.program}{story.timeline ? ` · ${story.timeline}` : ""}
        </p>

        {story.image?.url && (
          <img src={story.image.url} alt={story.title} className="w-full h-80 object-cover rounded-xl mb-8" />
        )}

        {story.quote && (
          <Card className="mb-6">
            <CardContent className="p-6">
              <blockquote className="text-xl italic text-gray-700">“{story.quote}”</blockquote>
            </CardContent>
          </Card>
        )}

        {story.story && (
          <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: story.story }} />
        )}

        {story.outcome && (
          <div className="mt-8 bg-red-50 border border-red-100 rounded-lg p-4">
            <p className="text-sm text-gray-600 mb-1">Current Status</p>
            <p className="font-semibold text-gray-900">{story.outcome}</p>
          </div>
        )}
      </div>
    </div>
  );
}
