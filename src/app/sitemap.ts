// app/sitemap.ts
export default function sitemap() {
  const base = "https://mysite.com";

  return [
    { url: `${base}/`, lastModified: new Date() },
    { url: `${base}/about`, lastModified: new Date() },
    { url: `${base}/tours`, lastModified: new Date() },
    { url: `${base}/faq`, lastModified: new Date() },
  ];
}
