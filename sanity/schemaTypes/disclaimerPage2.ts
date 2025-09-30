import { defineType, defineField, defineArrayMember } from 'sanity'

export const disclaimerPage2 = defineType({
  type: "object",
  name: "disclaimerPage2",
  preview: {
    select: {
      title: '', 
    },
    prepare(selection) {
      return {
        title: selection.title || 'Disclaimer Page 2',
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
        name: 'scrollDownTitle',
        type: 'object',
        title: 'Scroll Down Title',
        fields: [
          { name: 'en', title: 'English', type: 'string'},
          { name: 'ar', title: 'Arabic', type: 'string'},
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
        name: 'agreeCta',
        type: 'object',
        title: 'Agree Call to Action',
        fields: [
          defineField({
            name: 'title',
            type: 'object',
            title: 'Agree CTA Title',
            fields: [
              { name: 'en', title: 'English', type: 'string', validation: Rule => Rule.required().error('English Agree CTA Title is required') },
              { name: 'ar', title: 'Arabic', type: 'string', validation: Rule => Rule.required().error('Arabic Agree CTA Title is required') },
            ],
          }),
          defineField({
            name: 'href',
            type: 'object',
            title: 'Agree CTA URL',
            fields: [
              { name: 'en', title: 'English', type: 'string', validation: Rule => Rule.required().error('English Agree CTA URL is required') },
              { name: 'ar', title: 'Arabic', type: 'string', validation: Rule => Rule.required().error('Arabic Agree CTA URL is required') },
            ],
          }),
        ],
      }),
      defineField({
        name: 'cancelCta',
        type: 'object',
        title: 'Cancel Call to Action',
        fields: [
          defineField({
            name: 'title',
            type: 'object',
            title: 'Cancel CTA Title',
            fields: [
              { name: 'en', title: 'English', type: 'string', validation: Rule => Rule.required().error('English Cancel CTA Title is required') },
              { name: 'ar', title: 'Arabic', type: 'string', validation: Rule => Rule.required().error('Arabic Cancel CTA Title is required') },
            ],
          }),
          defineField({
            name: 'href',
            type: 'object',
            title: 'Cancel CTA URL',
            fields: [
              { name: 'en', title: 'English', type: 'string', validation: Rule => Rule.required().error('English Cancel CTA URL is required') },
              { name: 'ar', title: 'Arabic', type: 'string', validation: Rule => Rule.required().error('Arabic Cancel CTA URL is required') },
            ],
          }),
        ],
      }),
  ],
});
