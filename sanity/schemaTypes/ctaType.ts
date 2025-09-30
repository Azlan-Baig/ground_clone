import { defineType, defineField } from 'sanity'

export const ctaType = defineType({
  type: "object",
  name: "ctaType",
  title: "CTA",
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
    {
      type: 'boolean',
      name: 'customUrlEnable',
      title: 'Enable Custom URL',
      description: 'Enable to specify a custom URL instead of linking to a page.',
      initialValue: false, // Default value
    },
    {
      type: 'object',
      name: 'href',
      title: 'Custom URL',
      hidden: ({ parent }: { parent: { customUrlEnable?: boolean } }) => !parent?.customUrlEnable, // Type the parent object
      fields: [
        {
          name: 'en',
          title: 'English',
          type: 'string',
          validation: (Rule: any) =>
            Rule.custom((value: string, context: { parent?: { customUrlEnable?: boolean } }) => {
              return context?.parent?.customUrlEnable && !value
                ? 'English CTA URL is required'
                : true;
            }),
        },
        {
          name: 'ar',
          title: 'Arabic',
          type: 'string',
          validation: (Rule: any) =>
            Rule.custom((value: string, context: { parent?: { customUrlEnable?: boolean } }) => {
              return context?.parent?.customUrlEnable && !value
                ? 'Arabic CTA URL is required'
                : true;
            }),
        },
      ],
    },
    
    
    {
      name: 'page',
      title: 'Linked Page',
      type: 'reference',
      to: [{ type: 'page' }],
      hidden: ({ parent }) => parent?.customUrlEnable, 
    }
  ],
});
