import { defineType, defineField, defineArrayMember } from 'sanity'

export const disclaimerPage1 = defineType({
  type: "object",
  name: "disclaimerPage1",
  preview: {
    select: {
      title: '', 
    },
    prepare(selection) {
      return {
        title: selection.title || 'Disclaimer Page 1',
      };
    },
  },
  fields: [
    defineField({
      name: 'disclaimerTitle',
      type: 'object',
      title: 'Disclaimer Title',
      fields: [
          { name: 'en', title: 'English', type: 'string', validation: Rule => Rule.required().error(`English Disclaimer Title is required`)  },
          { name: 'ar', title: 'Arabic', type: 'string', validation: Rule => Rule.required().error(`Arabic Disclaimer Title is required`)  },
        ], 
    }),
    defineField({
      name: 'content',
      type: 'object',
      title: 'Disclaimer Content',
      fields: [
        { name: 'en', title: 'English', type: 'array', of: [{ type: 'block' }], validation: Rule => Rule.required().error('English Disclaimer Content is required') },
        { name: 'ar', title: 'Arabic', type: 'array', of: [{ type: 'block' }], validation: Rule => Rule.required().error('Arabic Disclaimer Content is required') },
      ],
    }),
    defineField({
      name: 'selectCountryLabel',
      type: 'object',
      title: 'Select Country Label',
      fields: [
        { name: 'en', title: 'English', type: 'string', validation: Rule => Rule.required().error('English Select Country Label is required') },
        { name: 'ar', title: 'Arabic', type: 'string', validation: Rule => Rule.required().error('Arabic Select Country Label is required') },
      ],
    }),
    defineField({
      name: 'cta',
      type: 'object',
      title: 'Call to Action',
      fields: [
        defineField({
          name: 'title',
          type: 'object',
          title: 'CTA Title',
          fields: [
            { name: 'en', title: 'English', type: 'string', validation: Rule => Rule.required().error('English CTA Title is required') },
            { name: 'ar', title: 'Arabic', type: 'string', validation: Rule => Rule.required().error('Arabic CTA Title is required') },
          ],
        }),
        defineField({
          name: 'href',
          type: 'object',
          title: 'CTA URL',
          fields: [
            { name: 'en', title: 'English', type: 'url', validation: Rule => Rule.required().error('English CTA URL is required') },
            { name: 'ar', title: 'Arabic', type: 'url', validation: Rule => Rule.required().error('Arabic CTA URL is required') },
          ],
        }),
        // defineField({
        //   name: 'icon',
        //   type: 'image',
        //   title: 'CTA Icon',
        //   validation: Rule => Rule.required().error('CTA Icon is required') ,
        // }),
      ],
    }),
  ],
});
