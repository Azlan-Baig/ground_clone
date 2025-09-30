import { defineType, defineField } from 'sanity';

export const footerBlock = defineType({
  type: 'object',
  name: 'footerBlock',
  fields: [
    defineField({
      type: 'image',
      name: 'logo',
      title: 'Logo',
      options: {
        hotspot: true, 
      },
      validation: (rule) => rule
      .required()
      .error(`Image Required`),
    }),
    defineField({
      type: 'string',
      name: 'text',
      title: 'Text',
    }),
    defineField({
      type: 'image',
      name: 'secondaryLogo',
      title: 'Secondary Logo',
      options: {
        hotspot: true, 
      },
      validation: (rule) => rule
      .required()
      .error(`Image Required`),
    }),
  ],
});