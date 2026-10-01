import { useEffect, useRef, useState } from "react";

const VIDEO_SOURCES = [
  {
    poster: "/videos/herramientas-poster.webp",
    mp4: "/videos/herramientas-1.mp4",
  },
  {
    poster: "/videos/herramientas-poster.webp",
    mp4: "/videos/herramientas-2.mp4",
  },
  {
    poster: "/videos/herramientas-poster.webp",
    mp4: "/videos/herramientas-3.mp4",
  },
];

export default function LazyVideoCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [shouldLoad, setShouldLoad] = useState(false);
  const wrapRef = useRef(null);

  useEffect(() => {
    const node = wrapRef.current;
    if (!node) return undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const showPrev = () => {
    setActiveIndex((current) => (current - 1 + VIDEO_SOURCES.length) % VIDEO_SOURCES.length);
  };

  const showNext = () => {
    setActiveIndex((current) => (current + 1) % VIDEO_SOURCES.length);
  };

  const current = VIDEO_SOURCES[activeIndex];

  return (
    <div className="video-carousel" ref={wrapRef}>
      <button type="button" className="video-arrow" aria-label="Video anterior" onClick={showPrev}>
        &#10094;
      </button>
      <div className="video-frame">
        <video
          key={`${shouldLoad}-${current.mp4}`}
          className="tools-video"
          controls
          muted
          loop
          playsInline
          preload="none"
          poster={current.poster}
          src={shouldLoad ? current.mp4 : undefined}
        >
          <track kind="captions" src="/videos/empty-captions.vtt" srcLang="es" label="Español" />
        </video>
      </div>
      <button type="button" className="video-arrow" aria-label="Siguiente video" onClick={showNext}>
        &#10095;
      </button>
    </div>
  );
}
