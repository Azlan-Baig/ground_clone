import { defineType, defineField, defineArrayMember } from 'sanity';

export const getInTouchSection = defineType({
  type: 'object',
  name: 'getInTouchSection',
  preview: {
    select: {
      title: '', 
    },
    prepare(selection) {
      return {
        title: selection.title || 'Get In Touch',
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
              options: {
                hotspot: true, 
              },
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
            // defineField({
            //   type: 'object',
            //   name: 'emailLabel',
            //   title: 'Email Label',
            //   fields: [
            //     { name: 'en', title: 'English', type: 'string', validation: Rule => Rule.required().error(`English Label Required`)  },
            //     { name: 'ar', title: 'Arabic', type: 'string', validation: Rule => Rule.required().error(`Arabic Label Required`)  },
            //   ], 
            // }),
            defineField({
              type: 'image',
              name: 'emailIcon',
              title: 'Email Icon',
              options: {
                hotspot: true, 
              },
              validation: (rule) => rule
              .required()
              .error(`Email Icon is Required`),
            }),
            defineField({
              type: 'string',
              name: 'email',
              title: 'Email',
              validation: Rule => Rule.email().error('Must be a valid email address'),
            }),
            defineField({
              type: 'image',
              name: 'webIcon',
              title: 'Website Icon',
              options: {
                hotspot: true, 
              },
              validation: (rule) => rule
              .required()
              .error(`Website icon is Required`),
            }),
            defineField({
              type: 'object',
              name: 'websiteLabel',
              title: 'Website Label',
              fields: [
                { name: 'en', title: 'English', type: 'string', validation: Rule => Rule.required().error(`English Label Required`)  },
                { name: 'ar', title: 'Arabic', type: 'string', validation: Rule => Rule.required().error(`Arabic Label Required`)  },
              ], 
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
    // defineField({
    //   type: 'image',
    //   name: 'logo',
    //   title: 'Logo',
    //   options: { hotspot: true },
    // }),
  ],
});