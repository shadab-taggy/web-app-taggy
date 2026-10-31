/** Serves public/ images as-is, prefixed with the deploy base path (e.g. /web-app-taggy). */
export default function imageLoader({ src, width }: { src: string; width: number }) {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  return src.startsWith("/") ? `${base}${src}?w=${width}` : src;
}
