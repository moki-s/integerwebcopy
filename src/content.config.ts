import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const services = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/services" }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    metaTitle: z.string().max(60),
    metaDescription: z.string().min(140).max(160),
    heroHeading: z.string(),
    heroSubheading: z.string(),
    shortDescription: z.string(),
    longDescription: z.string(),
    thumbnail: z.string(),
    thumbnailAlt: z.string(),
    courses: z.array(
      z.object({
        name: z.string(),
        level: z.string(),
        duration: z.string(),
        price: z.string(),
        tutorPrice: z.string().optional(),
        accreditor: z.string(),
        image: z.string().optional(),
        description: z.string(),
      }),
    ),
    benefits: z.array(z.string()),
    faqs: z.array(
      z.object({
        question: z.string(),
        answer: z.string(),
      }),
    ),
  }),
});

const locations = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/locations" }),
  schema: z.object({
    city: z.string(),
    state: z.string(),
    slug: z.string(),
    metaTitle: z.string().max(60),
    metaDescription: z.string().min(140).max(160),
    heroHeading: z.string(),
    heroSubheading: z.string().optional(),
    intro: z.string(),
    address: z.string(),
    phone: z.string(),
    servicesOffered: z.array(z.string()),
    isPrimary: z.boolean().optional(),
    faqs: z
      .array(
        z.object({
          question: z.string(),
          answer: z.string(),
        }),
      )
      .optional(),
  }),
});

export const collections = { services, locations };
