// app/resources/tag/[slug]/page.tsx
import { fetchResourcesByTagSlug } from "@/lib/api/resourceLists";
import { adaptTagList } from "@/lib/mappers/resourceList";
import ResourceListClient from "@/components/page/ResourceListClient";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

type Props = { params: { slug: string } };

export default async function TagListPage({ params }: Props) {
  const data = await fetchResourcesByTagSlug(params.slug);
  if (!data.items.length) return notFound();

  const props = adaptTagList(data);
  return <ResourceListClient data={props} />;
}
