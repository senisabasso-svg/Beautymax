import OptimizedImage from "./OptimizedImage";

export function OrganicProProductContent({ product }) {
  const metadata = product.metadata || {};

  return (
    <>
      <div className="product-card-media">
        {product.image_url && (
          <OptimizedImage
            src={product.image_url}
            alt={`${product.name} – Organic Pro profesional Beautymax Uruguay`}
            width={460}
            height={460}
          />
        )}
      </div>
      <h3>{product.name}</h3>
      {metadata.volume && <p className="organic-pro-volume">{metadata.volume}</p>}
      {product.show_description && product.description && <p>{product.description}</p>}
      {metadata.includes?.length > 0 && (
        <ul className="organic-pro-includes">
          {metadata.includes.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      )}
    </>
  );
}
