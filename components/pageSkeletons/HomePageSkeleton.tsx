import { Skeleton } from "@/components/ui/skeleton";

export default function HomePageSkeleton() {
    return (
        <div className="min-h-screen bg-white overflow-x-hidden animate-pulse">
            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center justify-center pt-16">
                <div className="text-center max-w-4xl mx-auto px-4 space-y-8">
                    {/* Title */}
                    <div className="space-y-4">
                        <Skeleton className="w-3/4 h-16 mx-auto" />
                        <Skeleton className="w-2/3 h-16 mx-auto" />
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                        <Skeleton className="w-5/6 h-6 mx-auto" />
                        <Skeleton className="w-3/4 h-6 mx-auto" />
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-center gap-4">
                        <Skeleton className="w-48 h-14 rounded-full" />
                        <Skeleton className="w-48 h-14 rounded-full" />
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4">
                    {/* Header */}
                    <div className="text-center mb-16 space-y-4">
                        <Skeleton className="w-2/3 h-12 mx-auto" />
                        <Skeleton className="w-3/4 h-6 mx-auto" />
                    </div>

                    {/* Services Grid */}
                    <div className="space-y-20">
                        {[...Array(6)].map((_, index) => (
                            <div
                                key={index}
                                className={`flex flex-col lg:flex-row items-center gap-12 ${index % 2 !== 0 ? "lg:flex-row-reverse" : ""
                                    }`}
                            >
                                <div className="flex-1 space-y-4">
                                    <div className="flex items-center gap-4">
                                        <Skeleton className="w-16 h-16 rounded-2xl" />
                                        <div className="space-y-2">
                                            <Skeleton className="w-48 h-8" />
                                            <Skeleton className="w-64 h-5" />
                                        </div>
                                    </div>
                                    <Skeleton className="w-full h-5" />
                                    <Skeleton className="w-5/6 h-5" />
                                    <Skeleton className="w-32 h-10 rounded" />
                                </div>
                                <div className="flex-1 flex justify-center">
                                    <Skeleton className="w-80 h-80 rounded-3xl" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gray-500">
                <div className="max-w-4xl mx-auto text-center px-4 space-y-8">
                    <div className="space-y-4">
                        <Skeleton className="w-2/3 h-12 mx-auto bg-white/20" />
                        <Skeleton className="w-3/4 h-6 mx-auto bg-white/20" />
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        {[...Array(3)].map((_, idx) => (
                            <Skeleton key={idx} className="h-32 rounded-xl bg-white/20" />
                        ))}
                    </div>

                    <Skeleton className="w-64 h-14 mx-auto rounded-full bg-white/30" />
                </div>
            </section>
        </div>
    )
}
