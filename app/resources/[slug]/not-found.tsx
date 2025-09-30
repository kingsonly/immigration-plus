export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-semibold mb-2">Resource not found</h1>
        <p className="text-gray-600">The page you’re looking for doesn’t exist.</p>
      </div>
    </div>
  );
}
