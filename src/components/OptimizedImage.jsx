function toModernSources(src) {
  if (!src || src.startsWith("http") || src.startsWith("data:")) {
    return { original: src, webp: null, avif: null };
  }
  const webp = src.replace(/\.(png|jpe?g)$/i, ".webp");
  const avif = src.replace(/\.(png|jpe?g)$/i, ".avif");
  if (webp === src) return { original: src, webp: null, avif: null };
  return { original: src, webp, avif };
}

export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  className,
  priority = false,
  sizes,
  srcSetWebp,
  srcSetAvif,
}) {
  if (!src) return null;
  const sources = toModernSources(src);
  const loading = priority ? "eager" : "lazy";
  const fetchPriority = priority ? "high" : undefined;

  const img = (
    <img
      src={sources.original}
      alt={alt}
      width={width}
      height={height}
      className={className}
      loading={loading}
      decoding="async"
      fetchPriority={fetchPriority}
      sizes={sizes}
    />
  );

  if (!sources.webp && !srcSetWebp) return img;

  return (
    <picture>
      {(srcSetAvif || sources.avif) && (
        <source type="image/avif" srcSet={srcSetAvif || sources.avif} sizes={sizes} />
      )}
      {(srcSetWebp || sources.webp) && (
        <source type="image/webp" srcSet={srcSetWebp || sources.webp} sizes={sizes} />
      )}
      {img}
    </picture>
  );
}

export function HeroPoster({ alt, className }) {
  const avifSrcSet =
    "/hero/beautymax-hero-480.avif 480w, /hero/beautymax-hero-768.avif 768w, /hero/beautymax-hero-1024.avif 1024w, /hero/beautymax-hero-1600.avif 1600w";
  const webpSrcSet =
    "/hero/beautymax-hero-480.webp 480w, /hero/beautymax-hero-768.webp 768w, /hero/beautymax-hero-1024.webp 1024w, /hero/beautymax-hero-1600.webp 1600w";

  return (
    <div className={className}>
      <OptimizedImage
        src="/hero/beautymax-hero-1024.webp"
        alt={alt}
        width={1024}
        height={598}
        priority
        sizes="(max-width: 980px) 92vw, 980px"
        srcSetAvif={avifSrcSet}
        srcSetWebp={webpSrcSet}
      />
    </div>
  );
}
