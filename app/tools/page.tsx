// app/tools/page.tsx
import ToolsClient from "@/components/page/ToolsClient";
import { fetchTools } from "@/lib/api/tools";
import { adaptTools } from "@/lib/mappers/tools";

export const dynamic = "force-dynamic"; // or: export const revalidate = 60;

export default async function ToolsPage() {
  const api = await fetchTools();
  const props = adaptTools(api);

  return <ToolsClient initialData={props} />;
}
