import { defineType, defineField, defineArrayMember } from 'sanity'

export const homePage = defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  fields: [
    // ── Hero carousel ───────────────────────────────────────────────
    defineField({
      name: 'heroSlides',
      title: 'Hero Slides',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'title', title: 'Title', type: 'string' }),
            defineField({ name: 'subtitle', title: 'Subtitle', type: 'string' }),
            defineField({ name: 'ctaLabel', title: 'Button Label', type: 'string' }),
            defineField({
              name: 'collectionSlug',
              title: 'Collection Slug',
              type: 'string',
              description: 'URL path segment, e.g. "spring-2025" → /collections/spring-2025',
            }),
            defineField({
              name: 'image',
              title: 'Background Image',
              type: 'image',
              options: { hotspot: true },
            }),
          ],
          preview: {
            select: { title: 'title', media: 'image' },
          },
        }),
      ],
    }),

    // ── Company story ────────────────────────────────────────────────
    defineField({ name: 'storyHeading', title: 'Story Heading', type: 'string' }),
    defineField({ name: 'storyBody', title: 'Story Body', type: 'text', rows: 5 }),
    defineField({
      name: 'storyImage',
      title: 'Story Image',
      type: 'image',
      options: { hotspot: true },
    }),

    // ── Badges / recommendations ─────────────────────────────────────
    defineField({
      name: 'badgesHeading',
      title: 'Badges Section Heading',
      type: 'string',
    }),
    defineField({
      name: 'badges',
      title: 'Badges',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'label', title: 'Label', type: 'string' }),
            defineField({
              name: 'image',
              title: 'Icon / Badge Image',
              type: 'image',
              options: { hotspot: true },
            }),
          ],
          preview: { select: { title: 'label', media: 'image' } },
        }),
      ],
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Home Page' }),
  },
})
