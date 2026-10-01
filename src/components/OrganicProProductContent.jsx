export function OrganicProProductContent({ product }) {
  const metadata = product.metadata || {};

  return (
    <>
      {product.image_url && (
        <img src={product.image_url} alt={`${product.name} – Organic Pro profesional Beautymax Uruguay`} loading="lazy" />
      )}
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
