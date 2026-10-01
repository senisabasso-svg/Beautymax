import { useCallback, useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CATALOG_BUCKET, isSupabaseConfigured, supabase } from "../../lib/supabase";
import { seedCatalogFromDefaults } from "../../lib/seedCatalog";
import { findDuplicateSectionSlug, getUserFriendlyError } from "../../lib/userFriendlyErrors";
import { isLockedSection, isOrganicProSection } from "../../data/lockedSections";
import "../../admin.css";

const EMPTY_SECTION = {
  slug: "",
  title: "",
  nav_label: "",
  section_type: "product_grid",
  style_variant: "default",
  kicker: "",
  hero_text: "",
  hero_logo: "",
  sort_order: 0,
  show_in_nav: true,
};

const EMPTY_PRODUCT = {
  name: "",
  image_url: "",
  description: "",
  show_description: false,
  sort_order: 0,
  metadata: {},
};

function slugify(value) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

async function uploadImage(file) {
  const extension = file.name.split(".").pop();
  const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${extension}`;

  const { error } = await supabase.storage.from(CATALOG_BUCKET).upload(path, file, {
    cacheControl: "31536000",
    upsert: false,
  });

  if (error) throw error;

  const { data } = supabase.storage.from(CATALOG_BUCKET).getPublicUrl(path);
  return data.publicUrl;
}

export default function AdminPanel() {
  const navigate = useNavigate();
  const [sections, setSections] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedSectionId, setSelectedSectionId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [sectionForm, setSectionForm] = useState(EMPTY_SECTION);
  const [productForm, setProductForm] = useState(EMPTY_PRODUCT);
  const [editingSectionId, setEditingSectionId] = useState(null);
  const [editingProductId, setEditingProductId] = useState(null);
  const [sectionFormMode, setSectionFormMode] = useState("idle");
  const [uploading, setUploading] = useState(false);

  const selectedSection = useMemo(
    () => sections.find((section) => section.id === selectedSectionId) || null,
    [sections, selectedSectionId],
  );

  const sectionProducts = useMemo(
    () => products.filter((product) => product.section_id === selectedSectionId),
    [products, selectedSectionId],
  );

  const loadData = useCallback(async () => {
    if (!supabase) return;
    setLoading(true);
    setError("");

    const [{ data: sectionRows, error: sectionsError }, { data: productRows, error: productsError }] =
      await Promise.all([
        supabase.from("sections").select("*").order("sort_order", { ascending: true }),
        supabase.from("products").select("*").order("sort_order", { ascending: true }),
      ]);

    if (sectionsError || productsError) {
      setError(getUserFriendlyError(sectionsError || productsError));
      setLoading(false);
      return;
    }

    setSections(sectionRows || []);
    setProducts(productRows || []);
    setSelectedSectionId((current) => current || sectionRows?.[0]?.id || null);
    setLoading(false);
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin");
  };

  const handleSeed = async () => {
    setMessage("");
    setError("");
    try {
      const count = await seedCatalogFromDefaults();
      setMessage(`Se importaron ${count} secciones con sus productos.`);
      await loadData();
    } catch (seedError) {
      setError(getUserFriendlyError(seedError));
    }
  };

  const resetSectionForm = () => {
    setSectionForm(EMPTY_SECTION);
    setEditingSectionId(null);
    setSectionFormMode("create");
  };

  const resetProductForm = () => {
    setProductForm(EMPTY_PRODUCT);
    setEditingProductId(null);
  };

  const handleSectionSubmit = async (event) => {
    event.preventDefault();
    setMessage("");
    setError("");

    const editingSection = sections.find((section) => section.id === editingSectionId);
    if (isLockedSection(editingSection)) {
      setError("Esta sección tiene diseño fijo y no se puede modificar.");
      return;
    }

    const payload = {
      ...sectionForm,
      slug: sectionForm.slug || slugify(sectionForm.title),
      nav_label: sectionForm.nav_label || sectionForm.title,
      sort_order: Number(sectionForm.sort_order) || 0,
    };

    if (findDuplicateSectionSlug(sections, payload.slug, editingSectionId)) {
      setError("Ya existe una categoría con ese nombre. Por favor, ingrese un nombre diferente.");
      return;
    }

    const query = editingSectionId
      ? supabase.from("sections").update(payload).eq("id", editingSectionId)
      : supabase.from("sections").insert(payload);

    const { error: saveError } = await query;
    if (saveError) {
      setError(getUserFriendlyError(saveError, "section"));
      return;
    }

    setMessage(editingSectionId ? "Sección actualizada." : "Sección creada.");
    setSectionForm(EMPTY_SECTION);
    setEditingSectionId(null);
    setSectionFormMode("idle");
    await loadData();
  };

  const handleEditSection = (section) => {
    if (isLockedSection(section)) {
      setError("");
      setMessage("Organic Pro es una sección fija. Podés gestionar sus productos en el panel de la derecha.");
      setSelectedSectionId(section.id);
      setEditingSectionId(null);
      setSectionForm(EMPTY_SECTION);
      setSectionFormMode("idle");
      return;
    }

    setSectionFormMode("edit");
    setEditingSectionId(section.id);
    setSectionForm({
      slug: section.slug,
      title: section.title,
      nav_label: section.nav_label || "",
      section_type: section.section_type,
      style_variant: section.style_variant,
      kicker: section.kicker || "",
      hero_text: section.hero_text || "",
      hero_logo: section.hero_logo || "",
      sort_order: section.sort_order,
      show_in_nav: section.show_in_nav,
    });
  };

  const handleDeleteSection = async (sectionId) => {
    const section = sections.find((item) => item.id === sectionId);
    if (isLockedSection(section)) {
      setError("Esta sección no se puede eliminar.");
      return;
    }

    if (!window.confirm("¿Eliminar esta sección y todos sus productos?")) return;
    const { error: deleteError } = await supabase.from("sections").delete().eq("id", sectionId);
    if (deleteError) {
      setError(getUserFriendlyError(deleteError, "section"));
      return;
    }
    if (selectedSectionId === sectionId) setSelectedSectionId(null);
    setMessage("Sección eliminada.");
    setSectionForm(EMPTY_SECTION);
    setEditingSectionId(null);
    setSectionFormMode("idle");
    await loadData();
  };

  const handleProductSubmit = async (event) => {
    event.preventDefault();
    if (!selectedSectionId) {
      setError("Seleccioná una sección primero.");
      return;
    }

    setMessage("");
    setError("");

    const payload = {
      ...productForm,
      section_id: selectedSectionId,
      sort_order: Number(productForm.sort_order) || 0,
      metadata: productForm.metadata || {},
    };

    const query = editingProductId
      ? supabase.from("products").update(payload).eq("id", editingProductId)
      : supabase.from("products").insert(payload);

    const { error: saveError } = await query;
    if (saveError) {
      setError(getUserFriendlyError(saveError, "product"));
      return;
    }

    setMessage(editingProductId ? "Producto actualizado." : "Producto creado.");
    resetProductForm();
    await loadData();
  };

  const handleEditProduct = (product) => {
    setEditingProductId(product.id);
    setProductForm({
      name: product.name,
      image_url: product.image_url || "",
      description: product.description || "",
      show_description: product.show_description,
      sort_order: product.sort_order,
      metadata: product.metadata || {},
    });
  };

  const handleDeleteProduct = async (productId) => {
    if (!window.confirm("¿Eliminar este producto?")) return;
    if (deleteError) {
      setError(getUserFriendlyError(deleteError, "product"));
      return;
    }
    setMessage("Producto eliminado.");
    resetProductForm();
    await loadData();
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError("");
    try {
      const publicUrl = await uploadImage(file);
      setProductForm((current) => ({ ...current, image_url: publicUrl }));
      setMessage("Imagen subida correctamente.");
    } catch (uploadError) {
      setError(getUserFriendlyError(uploadError, "upload"));
    } finally {
      setUploading(false);
      event.target.value = "";
    }
  };

  const isSelectedSectionLocked = isLockedSection(selectedSection);
  const showSectionForm = sectionFormMode === "create" || sectionFormMode === "edit";

  return (
    <div className="admin-shell">
      <header className="admin-topbar">
        <div>
          <p className="admin-kicker">Beautymax Backoffice</p>
          <h1>Gestión de catálogo</h1>
        </div>
        <div className="admin-topbar-actions">
          <Link to="/" className="admin-btn admin-btn-secondary">
            Ver sitio
          </Link>
          <button type="button" className="admin-btn admin-btn-secondary" onClick={handleLogout}>
            Cerrar sesión
          </button>
        </div>
      </header>

      {!isSupabaseConfigured && (
        <div className="admin-alert">Configurá Supabase en el archivo .env para usar el backoffice.</div>
      )}

      {message && <div className="admin-success">{message}</div>}
      {error && <div className="admin-error-banner">{error}</div>}

      <div className="admin-toolbar">
        <button type="button" className="admin-btn admin-btn-secondary" onClick={handleSeed}>
          Importar catálogo inicial
        </button>
        <span className="admin-muted">
          Usá esto una sola vez para cargar Productos, Organic Pro, Herramientas y Colecciones actuales.
        </span>
      </div>

      {loading ? (
        <p>Cargando...</p>
      ) : (
        <div className="admin-grid">
          <section className="admin-panel">
            <div className="admin-panel-head">
              <h2>Secciones</h2>
              <button type="button" className="admin-btn admin-btn-secondary" onClick={resetSectionForm}>
                Nueva
              </button>
            </div>

            <form className="admin-form admin-form-compact" onSubmit={handleSectionSubmit}>
              {showSectionForm ? (
                <>
              <label>
                Título
                <input
                  value={sectionForm.title}
                  onChange={(event) => setSectionForm({ ...sectionForm, title: event.target.value })}
                  required
                />
              </label>
              <label>
                Slug (URL)
                <input
                  value={sectionForm.slug}
                  onChange={(event) => setSectionForm({ ...sectionForm, slug: event.target.value })}
                  placeholder="Se genera solo si lo dejás vacío"
                />
              </label>
              <label>
                Texto en menú
                <input
                  value={sectionForm.nav_label}
                  onChange={(event) => setSectionForm({ ...sectionForm, nav_label: event.target.value })}
                />
              </label>
              <div className="admin-form-row">
                <label>
                  Tipo
                  <select
                    value={sectionForm.section_type}
                    onChange={(event) => setSectionForm({ ...sectionForm, section_type: event.target.value })}
                  >
                    <option value="product_grid">Grilla de productos</option>
                    <option value="collection_cards">Tarjetas (colecciones)</option>
                    <option value="brand_featured">Marca destacada (Organic Pro)</option>
                  </select>
                </label>
                <label>
                  Estilo
                  <select
                    value={sectionForm.style_variant}
                    onChange={(event) => setSectionForm({ ...sectionForm, style_variant: event.target.value })}
                  >
                    <option value="default">Default</option>
                    <option value="surface">Fondo gris</option>
                    <option value="organic">Organic Pro</option>
                  </select>
                </label>
              </div>
              <div className="admin-form-row">
                <label>
                  Orden
                  <input
                    type="number"
                    value={sectionForm.sort_order}
                    onChange={(event) => setSectionForm({ ...sectionForm, sort_order: event.target.value })}
                  />
                </label>
                <label className="admin-checkbox">
                  <input
                    type="checkbox"
                    checked={sectionForm.show_in_nav}
                    onChange={(event) => setSectionForm({ ...sectionForm, show_in_nav: event.target.checked })}
                  />
                  Mostrar en menú
                </label>
              </div>
              {sectionForm.section_type === "brand_featured" && (
                <>
                  <label>
                    Kicker
                    <input
                      value={sectionForm.kicker}
                      onChange={(event) => setSectionForm({ ...sectionForm, kicker: event.target.value })}
                    />
                  </label>
                  <label>
                    Texto hero
                    <textarea
                      value={sectionForm.hero_text}
                      onChange={(event) => setSectionForm({ ...sectionForm, hero_text: event.target.value })}
                      rows={3}
                    />
                  </label>
                  <label>
                    Logo hero (URL)
                    <input
                      value={sectionForm.hero_logo}
                      onChange={(event) => setSectionForm({ ...sectionForm, hero_logo: event.target.value })}
                    />
                  </label>
                </>
              )}
              <button type="submit" className="admin-btn admin-btn-primary">
                {editingSectionId ? "Guardar sección" : "Crear sección"}
              </button>
                </>
              ) : isSelectedSectionLocked ? (
                <div className="admin-locked-section">
                  <span className="admin-locked-badge">Sección fija</span>
                  <h3>{selectedSection?.title}</h3>
                  <p className="admin-muted">
                    El nombre y diseño de Organic Pro están bloqueados. Seleccioná esta categoría y gestioná
                    sus productos en el panel de la derecha.
                  </p>
                </div>
              ) : (
                <p className="admin-muted">Usá «Nueva» para crear una sección o «Editar» en la lista.</p>
              )}
            </form>

            <ul className="admin-list">
              {sections.map((section) => (
                <li key={section.id} className={section.id === selectedSectionId ? "is-active" : ""}>
                  <button
                    type="button"
                    className="admin-list-select"
                    onClick={() => {
                      setSelectedSectionId(section.id);
                      setSectionFormMode("idle");
                      setEditingSectionId(null);
                      setSectionForm(EMPTY_SECTION);
                      if (isLockedSection(section)) {
                        setMessage("Gestioná los productos de Organic Pro en el panel de la derecha.");
                      } else {
                        setMessage("");
                      }
                    }}
                  >
                    <strong>
                      {section.title}
                      {isLockedSection(section) && <span className="admin-locked-badge inline">Fija</span>}
                    </strong>
                    <span>{section.slug}</span>
                  </button>
                  <div className="admin-list-actions">
                    {!isLockedSection(section) && (
                      <>
                        <button type="button" onClick={() => handleEditSection(section)}>
                          Editar
                        </button>
                        <button type="button" className="danger" onClick={() => handleDeleteSection(section.id)}>
                          Eliminar
                        </button>
                      </>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </section>

          <section className="admin-panel">
            <div className="admin-panel-head">
              <h2>Productos {selectedSection ? `· ${selectedSection.title}` : ""}</h2>
              <button type="button" className="admin-btn admin-btn-secondary" onClick={resetProductForm}>
                Nuevo
              </button>
            </div>

            {!selectedSection ? (
              <p className="admin-muted">Seleccioná una sección para gestionar productos.</p>
            ) : (
              <>
                <form className="admin-form admin-form-compact" onSubmit={handleProductSubmit}>
                  <label>
                    Nombre
                    <input
                      value={productForm.name}
                      onChange={(event) => setProductForm({ ...productForm, name: event.target.value })}
                      required
                    />
                  </label>
                  <label>
                    Imagen (URL o subir archivo)
                    <input
                      value={productForm.image_url}
                      onChange={(event) => setProductForm({ ...productForm, image_url: event.target.value })}
                      placeholder="/productos/mi-producto.png"
                    />
                  </label>
                  <label className="admin-file">
                    Subir imagen
                    <input type="file" accept="image/*" onChange={handleImageUpload} disabled={uploading} />
                  </label>
                  <label>
                    Descripción
                    <textarea
                      value={productForm.description}
                      onChange={(event) => setProductForm({ ...productForm, description: event.target.value })}
                      rows={3}
                    />
                  </label>
                  <label className="admin-checkbox">
                    <input
                      type="checkbox"
                      checked={productForm.show_description}
                      onChange={(event) =>
                        setProductForm({ ...productForm, show_description: event.target.checked })
                      }
                    />
                    Mostrar descripción en el sitio
                  </label>
                  <label>
                    Orden
                    <input
                      type="number"
                      value={productForm.sort_order}
                      onChange={(event) => setProductForm({ ...productForm, sort_order: event.target.value })}
                    />
                  </label>
                  {isOrganicProSection(selectedSection) && (
                    <>
                      <label>
                        Volumen (opcional)
                        <input
                          value={productForm.metadata?.volume || ""}
                          onChange={(event) =>
                            setProductForm({
                              ...productForm,
                              metadata: { ...productForm.metadata, volume: event.target.value },
                            })
                          }
                        />
                      </label>
                      <label>
                        Incluye (uno por línea)
                        <textarea
                          value={(productForm.metadata?.includes || []).join("\n")}
                          onChange={(event) =>
                            setProductForm({
                              ...productForm,
                              metadata: {
                                ...productForm.metadata,
                                includes: event.target.value
                                  .split("\n")
                                  .map((line) => line.trim())
                                  .filter(Boolean),
                              },
                            })
                          }
                          rows={4}
                        />
                      </label>
                    </>
                  )}
                  <button type="submit" className="admin-btn admin-btn-primary" disabled={!selectedSectionId}>
                    {editingProductId ? "Guardar producto" : "Agregar producto"}
                  </button>
                </form>

                <ul className="admin-list admin-product-list">
                  {sectionProducts.map((product) => (
                    <li key={product.id}>
                      <div className="admin-product-preview">
                        {product.image_url && <img src={product.image_url} alt={product.name} />}
                        <div>
                          <strong>{product.name}</strong>
                          <span>{product.show_description ? "Descripción visible" : "Sin descripción visible"}</span>
                        </div>
                      </div>
                      <div className="admin-list-actions">
                        <button type="button" onClick={() => handleEditProduct(product)}>
                          Editar
                        </button>
                        <button type="button" className="danger" onClick={() => handleDeleteProduct(product.id)}>
                          Eliminar
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </section>
        </div>
      )}
    </div>
  );
}
