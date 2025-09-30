// app/resources/tag/[slug]/not-found.tsx
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center text-center px-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Tag not found</h1>
        <p className="text-gray-600 mb-6">We couldn’t find that tag.</p>
        <Link href="/resources">
          <Button className="bg-gradient-to-r from-red-500 to-red-600 hover:opacity-90">Back to Resources</Button>
        </Link>
      </div>
    </div>
  );
}
