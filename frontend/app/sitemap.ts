import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://bimera-group.com';

  return [
    { url: baseUrl, lastModified: new Date() },
    { url: `${baseUrl}/a-propos`, lastModified: new Date() },
    { url: `${baseUrl}/activites/agriculture`, lastModified: new Date() },
    { url: `${baseUrl}/activites/elevage`, lastModified: new Date() },
    { url: `${baseUrl}/activites/informatique`, lastModified: new Date() },
    { url: `${baseUrl}/activites/technique`, lastModified: new Date() },
    { url: `${baseUrl}/infos-pratiques`, lastModified: new Date() },
    { url: `${baseUrl}/medias-actualites/blog`, lastModified: new Date() },
    { url: `${baseUrl}/medias-actualites/galerie`, lastModified: new Date() },
    { url: `${baseUrl}/medias-actualites/evenements`, lastModified: new Date() },
    { url: `${baseUrl}/contact`, lastModified: new Date() },
  ];
}
