import type { MetadataRoute } from "next";
import { DATA } from "@/data/resume";

const baseUrl = DATA.url.replace(/\/$/, "");

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/chatbot`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    },
  ];

  return routes;
}
