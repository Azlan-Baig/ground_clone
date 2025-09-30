import { defineType, defineField, defineArrayMember } from 'sanity';

export const testimonialSection = defineType({
  type: 'object',
  name: 'testimonialSection',
  preview: {
    select: {
      title: '', 
    },
    prepare(selection) {
      return {
        title: selection.title || 'Testimonials',
      };
    },
  },
  fields: [
    defineField({
      type: 'object',
      name: 'title',
      title: 'Title',
      fields: [
        { name: 'en', title: 'English', type: 'string', validation: Rule => Rule.required().error(`English Title Required`)  },
        { name: 'ar', title: 'Arabic', type: 'string', validation: Rule => Rule.required().error(`Arabic Title Required`)  },
      ], 
    }),
    defineField({
      type: 'object',
      name: 'subtitle',
      title: 'Sub Title',
      fields: [
        { name: 'en', title: 'English', type: 'string', validation: Rule => Rule.required().error(`English Sub Title Required`)  },
        { name: 'ar', title: 'Arabic', type: 'string', validation: Rule => Rule.required().error(`Arabic Sub Title Required`)  },
      ], 
    }),
    defineField({
      type: 'array',
      name: 'items',
      title: 'Items',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              type: 'image',
              name: 'image',
              title: 'Image',
              options: { hotspot: true },
              validation: (rule) => rule
              .required()
              .error(`Image Required`),
            }),
            defineField({
              type: 'object',
              name: 'title',
              title: 'Title',
              fields: [
                { name: 'en', title: 'English', type: 'string' },
                { name: 'ar', title: 'Arabic', type: 'string' },
              ],
            }),
            defineField({
              type: 'string',
              name: 'email',
              title: 'Email',
              validation: Rule => Rule.email().error('Must be a valid email address'),
            }),
            defineField({
              type: 'string',
              name: 'website',
              title: 'Website URL',
            }),
          ],
        }),
      ],
      options: {
        layout: 'grid',
      },
    }),
  ],
});