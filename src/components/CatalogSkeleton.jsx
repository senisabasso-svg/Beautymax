export default function CatalogSkeleton({ cards = 8 }) {
  return (
    <div className="product-grid" aria-hidden="true">
      {Array.from({ length: cards }, (_, index) => (
        <article key={index} className="product-card product-card-skeleton">
          <div className="product-card-media skeleton-block" />
          <div className="skeleton-line" />
          <div className="skeleton-line short" />
        </article>
      ))}
    </div>
  );
}

export function BrandsSkeleton({ cards = 7 }) {
  return (
    <div className="brand-grid" aria-hidden="true">
      {Array.from({ length: cards }, (_, index) => (
        <div key={index} className="brand-item">
          <div className="brand-logo-slot skeleton-block" />
        </div>
      ))}
    </div>
  );
}
