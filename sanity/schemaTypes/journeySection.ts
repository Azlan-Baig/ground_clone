import { defineType, defineField, defineArrayMember } from 'sanity'

export const journeySection = defineType({
  type: "object",
  name: "journeySection",
  preview: {
    select: {
      title: '', 
    },
    prepare(selection) {
      return {
        title: selection.title || 'Journey',
      };
    },
  },
  fields: [
    defineField({
      title: 'Title',
      name: 'title',
      type: 'object',
      fields: [
        { name: 'en', title: 'English', type: 'string', validation: Rule => Rule.required().error(`English Title Required`)  },
        { name: 'ar', title: 'Arabic', type: 'string', validation: Rule => Rule.required().error(`Arabic Title Required`)  },
      ],      
    }),
    defineField({
      title: 'Sub Title',
      name: 'subtitle',
      type: 'object',
      fields: [
        { name: 'en', title: 'English', type: 'string', validation: Rule => Rule.required().error(`English Sub Title Required`)  },
        { name: 'ar', title: 'Arabic', type: 'string', validation: Rule => Rule.required().error(`Arabic Sub Title Required`)  },
      ],      
    }),
    defineField({
      title: 'Image',
      name: 'image',
      type: 'image',
      options: {
        hotspot: true, 
      },
      validation: (rule) => rule
      .required()
      .error(`Image Required`),
    }),
    defineField({
      title: 'Mobile Image',
      name: 'mobileImage',
      type: 'image',
      options: {
        hotspot: true, 
      },
      validation: (rule) => rule
      .required()
      .error(`Image Required`),
    }),
    defineField({
      type: 'array',
      name: 'stats',
      title: 'Stats',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              title: 'Title',
              name: 'title',
              type: 'object',
              fields: [
                { name: 'en', title: 'English', type: 'string', validation: Rule => Rule.required().error(`English Title Required`)  },
                { name: 'ar', title: 'Arabic', type: 'string', validation: Rule => Rule.required().error(`Arabic Title Required`)  },
              ],      
            }),
            defineField({
              title: 'Sub Title',
              name: 'subtitle',
              type: 'object',
              fields: [
                { name: 'en', title: 'English', type: 'string', validation: Rule => Rule.required().error(`English Sub Title Required`)  },
                { name: 'ar', title: 'Arabic', type: 'string', validation: Rule => Rule.required().error(`Arabic Sub Title Required`)  },
              ],      
            }),
          ],
        }),
      ],
    }),
    defineField({
      title: 'Content',
      name: 'content',
      type: 'object',
      fields: [
        { name: 'en', title: 'English', type: 'string' },
        { name: 'ar', title: 'Arabic', type: 'string'},
      ],      
    }),
  ],
});