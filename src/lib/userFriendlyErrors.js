const UNIQUE_VIOLATION_CODE = "23505";

function matchesConstraint(error, constraintName) {
  const haystack = [error?.message, error?.details, error?.hint].filter(Boolean).join(" ").toLowerCase();
  return haystack.includes(constraintName.toLowerCase());
}

export function getUserFriendlyError(error, context = "general") {
  if (!error) return "Ocurrió un error inesperado. Intentá nuevamente.";

  if (typeof error === "string") {
    return mapKnownMessage(error, context);
  }

  if (error.code === UNIQUE_VIOLATION_CODE || /duplicate key value/i.test(error.message || "")) {
    if (matchesConstraint(error, "sections_slug_key") || context === "section") {
      return "Ya existe una categoría con ese nombre. Por favor, ingrese un nombre diferente.";
    }
    return "Ya existe un registro con esos datos. Por favor, ingrese información diferente.";
  }

  if (/invalid login credentials/i.test(error.message || "")) {
    return "Email o contraseña incorrectos.";
  }

  if (/jwt expired|invalid jwt/i.test(error.message || "")) {
    return "Tu sesión expiró. Volvé a iniciar sesión.";
  }

  if (/network|fetch failed|failed to fetch/i.test(error.message || "")) {
    return "No se pudo conectar con el servidor. Verificá tu conexión e intentá nuevamente.";
  }

  return mapKnownMessage(error.message, context);
}

function mapKnownMessage(message, context) {
  if (!message) return "Ocurrió un error inesperado. Intentá nuevamente.";

  if (/duplicate key value/i.test(message)) {
    if (/sections_slug_key/i.test(message) || context === "section") {
      return "Ya existe una categoría con ese nombre. Por favor, ingrese un nombre diferente.";
    }
    return "Ya existe un registro con esos datos. Por favor, ingrese información diferente.";
  }

  if (/Ya existen secciones/i.test(message)) {
    return message;
  }

  return "No se pudo completar la operación. Intentá nuevamente.";
}

export function findDuplicateSectionSlug(sections, slug, excludeSectionId = null) {
  return sections.find((section) => section.slug === slug && section.id !== excludeSectionId);
}
