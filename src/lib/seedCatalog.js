import { DEFAULT_PRODUCTS_BY_SLUG, DEFAULT_SECTIONS } from "../data/catalogDefaults";
import { supabase } from "./supabase";

export async function seedCatalogFromDefaults() {
  if (!supabase) {
    throw new Error("Supabase no está configurado.");
  }

  const { count, error: countError } = await supabase
    .from("sections")
    .select("*", { count: "exact", head: true });

  if (countError) throw countError;
  if (count > 0) {
    throw new Error("Ya existen secciones en la base. No se importó nada para evitar duplicados.");
  }

  const insertedSections = [];

  for (const section of DEFAULT_SECTIONS) {
    const { data, error } = await supabase
      .from("sections")
      .insert(section)
      .select("*")
      .single();

    if (error) throw error;
    insertedSections.push(data);
  }

  for (const section of insertedSections) {
    const products = DEFAULT_PRODUCTS_BY_SLUG[section.slug] || [];
    if (!products.length) continue;

    const payload = products.map((product) => ({
      section_id: section.id,
      name: product.name,
      image_url: product.image_url || null,
      description: product.description || null,
      show_description: product.show_description ?? false,
      sort_order: product.sort_order,
      metadata: product.metadata || {},
    }));

    const { error } = await supabase.from("products").insert(payload);
    if (error) throw error;
  }

  return insertedSections.length;
}
