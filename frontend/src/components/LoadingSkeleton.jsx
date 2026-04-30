// components/LoadingSkeleton.jsx
export function ProductSkeleton() {
  return (
    <div className="card animate-pulse">
      <div className="aspect-square bg-dark-600" />
      <div className="p-4 space-y-3">
        <div className="h-4 bg-dark-600 rounded w-3/4" />
        <div className="h-4 bg-dark-600 rounded w-1/2" />
        <div className="h-8 bg-dark-600 rounded mt-4" />
      </div>
    </div>
  );
}

export function ProductGridSkeleton({ count = 8 }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {Array.from({ length: count }).map((_, i) => <ProductSkeleton key={i} />)}
    </div>
  );
}
