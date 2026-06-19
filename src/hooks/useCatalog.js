import { useCallback, useEffect, useState } from "react";
import { buildDefaultCatalog } from "../data/catalogDefaults";
import { isSupabaseConfigured, supabase } from "../lib/supabase";

export function useCatalog() {
  const [sections, setSections] = useState([]);
  const [productsBySectionId, setProductsBySectionId] = useState({});
  const [loading, setLoading] = useState(true);
  const [source, setSource] = useState("defaults");
  const [error, setError] = useState(null);

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

    try {
      const { data: sectionRows, error: sectionsError } = await supabase
        .from("sections")
        .select("*")
        .order("sort_order", { ascending: true });

      if (sectionsError) throw sectionsError;

      if (!sectionRows?.length) {
        const defaults = buildDefaultCatalog();
        setSections(defaults.sections);
        setProductsBySectionId(defaults.productsBySectionId);
        setSource(defaults.source);
        setLoading(false);
        return;
      }

      const { data: productRows, error: productsError } = await supabase
        .from("products")
        .select("*")
        .order("sort_order", { ascending: true });

      if (productsError) throw productsError;

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
      setSource("supabase");
    } catch (fetchError) {
      console.error(fetchError);
      setError(fetchError.message);
      const defaults = buildDefaultCatalog();
      setSections(defaults.sections);
      setProductsBySectionId(defaults.productsBySectionId);
      setSource("defaults");
    } finally {
      setLoading(false);
    }
  }, []);

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
