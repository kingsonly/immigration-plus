// app/resources/category/[slug]/page.tsx
import { getCategoryBySlug, getResourcesByCategorySlug } from "@/lib/api/resources-categories";
import Link from "next/link";
import { BookOpen, CheckCircle, Calculator, Info, ArrowRight, User, Calendar } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

function TypeIcon({ type }: { type: string }) {
  if (type === "guide") return <BookOpen className="w-4 h-4 text-white" />;
  if (type === "checklist") return <CheckCircle className="w-4 h-4 text-white" />;
  if (type === "calculator") return <Calculator className="w-4 h-4 text-white" />;
  return <Info className="w-4 h-4 text-white" />;
}

export default async function CategoryPage({ params }: { params: { slug: string } }) {
  const slug = decodeURIComponent(params.slug);
  const category = await getCategoryBySlug(slug);
  const items = await getResourcesByCategorySlug(slug);

  // Simple 404
  if (!category) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-24">
        <h1 className="text-3xl font-bold mb-4">Category not found</h1>
        <p className="text-gray-600 mb-6">The category you’re looking for does not exist.</p>
        <Link href="/resources">
          <Button className="bg-gradient-to-r from-red-500 to-red-600">Back to Resources</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-16">
      {/* Hero / Header */}
      <section className="py-16 bg-gradient-to-br from-red-50 via-white to-pink-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
              {category.name}
            </span>
          </h1>
          <p className="text-gray-600">Browse resources in the “{category.name}” category.</p>
        </div>
      </section>

      {/* Grid */}
      <section className="py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((resource) => (
            <Card key={resource.id} className="h-full hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex items-center space-x-2 mb-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-red-600 rounded-lg flex items-center justify-center">
                    <TypeIcon type={resource.type} />
                  </div>
                  <span className="text-xs text-gray-500 uppercase font-medium">{resource.type}</span>
                </div>

                <h3 className="text-lg font-bold text-gray-900 mb-2">{resource.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{resource.excerpt}</p>

                <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                  <div className="flex items-center space-x-1">
                    <User className="w-3 h-3" />
                    <span>{resource.author}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-3 h-3" />
                    <span>{resource.publishedOn ? new Date(resource.publishedOn).toLocaleDateString() : "-"}</span>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Link href={`/resources/${resource.slug}`}>
                    <Button size="sm" className="bg-gradient-to-r from-red-500 to-red-600 hover:opacity-90">
                      Read More <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {items.length === 0 && (
          <div className="max-w-4xl mx-auto px-4 text-center text-gray-500">No resources in this category yet.</div>
        )}
      </section>
    </div>
  );
}
