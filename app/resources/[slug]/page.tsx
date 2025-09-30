// app/resources/[slug]/page.tsx
import { fetchResourceBySlug } from "@/lib/api/resourceBySlug";
import { fetchRelatedResources } from "@/lib/api/resourcesRelated";
import { adaptResourceDetail, adaptRelated } from "@/lib/mappers/resourceDetail";
import ResourceDetailClient from "@/components/page/ResourceDetailClient";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic"; // reflect latest Strapi edits

type Props = { params: { slug: string } };

export async function generateMetadata({ params }: Props) {
  const res = await fetchResourceBySlug(params.slug);
  if (!res) return { title: "Resource not found" };
  return {
    title: res.title || "Resource",
    description: res.excerpt || undefined,
    openGraph: {
      title: res.title || "Resource",
      description: res.excerpt || undefined,
      type: "article",
    },
  };
}

export default async function ResourceDetailPage({ params }: Props) {
  const resource = await fetchResourceBySlug(params.slug);
  const detail = adaptResourceDetail(resource);
  if (!detail) return notFound();

  // Related: prefer tags, then category
  const relatedRaw = await fetchRelatedResources({
    currentSlug: detail.slug,
    tagSlugs: detail.tags.map((t) => t.slug),
    categorySlug: detail.category?.slug || null,
    limit: 6,
  });
  const related = adaptRelated(relatedRaw);

  return <ResourceDetailClient data={detail} related={related} />;
}
