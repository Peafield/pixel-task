export default function Loading() {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500" />
      <span className="ml-3 text-gray-600">Loading tasks...</span>
    </div>
  );
}
