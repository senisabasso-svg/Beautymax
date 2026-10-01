import { useCallback, useEffect, useState } from "react";
import { buildDefaultCatalog } from "../data/catalogDefaults";
import { isSupabaseConfigured, supabase } from "../lib/supabase";

const SECTION_COLUMNS =
  "id,slug,title,nav_label,section_type,style_variant,kicker,hero_text,hero_logo,sort_order,show_in_nav";
const PRODUCT_COLUMNS =
  "id,section_id,name,image_url,description,show_description,sort_order,metadata";

const CATALOG_CACHE_KEY = "beautymax-catalog-v1";

function readCache() {
  try {
    const raw = sessionStorage.getItem(CATALOG_CACHE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function writeCache(payload) {
  try {
    sessionStorage.setItem(CATALOG_CACHE_KEY, JSON.stringify(payload));
  } catch {
    // ignore quota errors
  }
}

export function useCatalog() {
  const [sections, setSections] = useState([]);
  const [productsBySectionId, setProductsBySectionId] = useState({});
  const [loading, setLoading] = useState(true);
  const [source, setSource] = useState("defaults");
  const [error, setError] = useState(null);

  const applyCatalog = useCallback((sectionRows, productRows, catalogSource) => {
    const grouped = {};
    for (const section of sectionRows) {
      grouped[section.id] = [];
    }
    for (const product of productRows || []) {
      if (!grouped[product.section_id]) grouped[product.section_id] = [];
      grouped[product.section_id].push(product);
    }
    setSections(sectionRows);
    setProductsBySectionId(grouped);
    setSource(catalogSource);
  }, []);

  const loadCatalog = useCallback(async () => {
    setLoading(true);
    setError(null);

    if (!isSupabaseConfigured || !supabase) {
      const defaults = buildDefaultCatalog();
      setSections(defaults.sections);
      setProductsBySectionId(defaults.productsBySectionId);
      setSource(defaults.source);
      setLoading(false);
      return;
    }

    const cached = readCache();
    if (cached?.sections?.length) {
      applyCatalog(cached.sections, cached.products, "cache");
      setLoading(false);
    }

    try {
      const [sectionsResult, productsResult] = await Promise.all([
        supabase.from("sections").select(SECTION_COLUMNS).order("sort_order", { ascending: true }),
        supabase.from("products").select(PRODUCT_COLUMNS).order("sort_order", { ascending: true }),
      ]);

      if (sectionsResult.error) throw sectionsResult.error;
      if (productsResult.error) throw productsResult.error;

      const sectionRows = sectionsResult.data || [];
      const productRows = productsResult.data || [];

      if (!sectionRows.length) {
        const defaults = buildDefaultCatalog();
        setSections(defaults.sections);
        setProductsBySectionId(defaults.productsBySectionId);
        setSource(defaults.source);
        setLoading(false);
        return;
      }

      applyCatalog(sectionRows, productRows, "supabase");
      writeCache({ sections: sectionRows, products: productRows });
    } catch (fetchError) {
      console.error(fetchError);
      setError(fetchError.message);
      if (!cached?.sections?.length) {
        const defaults = buildDefaultCatalog();
        setSections(defaults.sections);
        setProductsBySectionId(defaults.productsBySectionId);
        setSource("defaults");
      }
    } finally {
      setLoading(false);
    }
  }, [applyCatalog]);

  useEffect(() => {
    loadCatalog();
  }, [loadCatalog]);

  return {
    sections,
    productsBySectionId,
    loading,
    source,
    error,
    reload: loadCatalog,
  };
}
