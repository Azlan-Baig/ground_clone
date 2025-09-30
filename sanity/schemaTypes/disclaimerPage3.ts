import { defineType, defineField, defineArrayMember } from 'sanity'

export const disclaimerPage3 = defineType({
  type: "object",
  name: "disclaimerPage3",
  preview: {
    select: {
      title: '', 
    },
    prepare(selection) {
      return {
        title: selection.title || 'Disclaimer Page 3',
      };
    },
  },
  fields: [
    defineField({
        name: 'title',
        type: 'object',
        title: 'Title',
        fields: [
          { name: 'en', title: 'English', type: 'string', validation: Rule => Rule.required().error('English Title is required') },
          { name: 'ar', title: 'Arabic', type: 'string', validation: Rule => Rule.required().error('Arabic Title is required') },
        ],
      }),
    defineField({
        name: 'content',
        type: 'object',
        title: 'Disclaimer Content',
        fields: [
          { name: 'en', title: 'English', type: 'array', of: [{ type: 'block' }], validation: Rule => Rule.required().error('English Content is required') },
          { name: 'ar', title: 'Arabic', type: 'array', of: [{ type: 'block' }], validation: Rule => Rule.required().error('Arabic Content is required') },
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
                { name: 'en', title: 'English', type: 'string', validation: Rule => Rule.required().error('English CTA URL is required') },
                { name: 'ar', title: 'Arabic', type: 'string', validation: Rule => Rule.required().error('Arabic CTA URL is required') },
            ],
            }),
        ],
    }),
  ],
});
