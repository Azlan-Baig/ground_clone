import { defineType, defineField, defineArrayMember } from 'sanity'

export const investmentTimelineSection = defineType({
  type: "object",
  name: "investmentTimeline",
  preview: {
    select: {
      title: '', 
    },
    prepare(selection) {
      return {
        title: selection.title || 'Investment & Timeline',
      };
    },
  },
  fields: [
    // Title field (from investmentSection and timelineSection)
    defineField({
      title: 'Title',
      name: 'title',
      type: 'object',
      fields: [
        { name: 'en', title: 'English', type: 'string', validation: Rule => Rule.required().error(`English Title Required`) },
        { name: 'ar', title: 'Arabic', type: 'string', validation: Rule => Rule.required().error(`Arabic Title Required`) },
      ],      
    }),
    defineField({
        title: 'Highlight Title',
        name: 'titleHighlight',
        type: 'object',
        fields: [
          { name: 'en', title: 'English', type: 'string', validation: Rule => Rule.required().error(`English Title Required`) },
          { name: 'ar', title: 'Arabic', type: 'string', validation: Rule => Rule.required().error(`Arabic Title Required`) },
        ],      
      }),
    
    // Image field (from investmentSection)
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
    
    // Highlights field (from investmentSection)
    defineField({
      type: 'array',
      name: 'highlights',
      title: 'Highlights',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              title: 'Title',
              name: 'title',
              type: 'object',
              fields: [
                { name: 'en', title: 'English', type: 'string', validation: Rule => Rule.required().error(`English Title Required`) },
                { name: 'ar', title: 'Arabic', type: 'string', validation: Rule => Rule.required().error(`Arabic Title Required`) },
              ],      
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'object',
              fields: [
                { name: 'en', title: 'English', type: 'array', of: [{ type: 'block' }] },
                { name: 'ar', title: 'Arabic', type: 'array', of: [{ type: 'block' }] },
              ],
            }),
          ],
        }),
      ],
    }),

    // Stats (Timeline) field (from timelineSection)
    defineField({
      type: 'array',
      name: 'stats',
      title: 'Timeline Stats',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
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
              type: 'date',
              name: 'date',
              title: 'Date',
              options: {
                dateFormat: 'YYYY-MM-DD',
              }
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
