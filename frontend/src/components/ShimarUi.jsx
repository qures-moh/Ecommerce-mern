export default function ShimmerUi() {
  return (
    <div className="animate-pulse bg-white p-4 rounded-lg shadow">
      <div className="bg-gray-300 h-40 w-full rounded"></div>
      <div className="mt-3 h-4 bg-gray-300 rounded w-3/4"></div>
      <div className="mt-2 h-4 bg-gray-300 rounded w-1/2"></div>
    </div>
  );
}