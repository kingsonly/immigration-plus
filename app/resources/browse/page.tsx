// app/resources/browse/page.tsx
import ResourcesBrowseClient from "@/components/page/ResourcesBrowseClient";
import { fetchResourcesList } from "@/lib/api/resourcesBrowse";
import { adaptResourcesList } from "@/lib/mappers/resourcesList";

export const dynamic = "force-dynamic"; // always up-to-date; change to revalidate if you want

type PageProps = {
  searchParams: {
    q?: string;
    category?: string;    // "all" | "guides" | "checklists" | "calculators" | "news"
    type?: string;        // optional: "guide" | "checklist" | "calculator" | "news"
    page?: string;        // 1-based
    pageSize?: string;    // default 12
  };
};

export default async function Page({ searchParams }: PageProps) {
  const query = {
    q: searchParams.q ?? "",
    category: searchParams.category ?? "all",
    type: searchParams.type ?? "",
    page: Math.max(parseInt(searchParams.page || "1", 10) || 1, 1),
    pageSize: Math.min(Math.max(parseInt(searchParams.pageSize || "12", 10) || 12, 1), 60),
  };

  // 1) server fetch
  const api = await fetchResourcesList(query);

  // 2) adapt
  const props = adaptResourcesList(api, query);

  // 3) render client w/ already formatted payload
  return <ResourcesBrowseClient initialData={props} />;
}
