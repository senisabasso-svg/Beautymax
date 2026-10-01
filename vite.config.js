import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const supabaseUrl = env.VITE_SUPABASE_URL;

  return {
    plugins: [
      react(),
      {
        name: "inject-supabase-preconnect",
        transformIndexHtml(html) {
          if (!supabaseUrl) {
            return html.replace("<!--supabase-preconnect-->", "");
          }
          return html.replace(
            "<!--supabase-preconnect-->",
            `<link rel="preconnect" href="${supabaseUrl}" crossorigin />\n    <link rel="dns-prefetch" href="${supabaseUrl}" />`,
          );
        },
      },
    ],
  };
});
