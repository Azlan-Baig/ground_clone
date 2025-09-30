import { defineType, defineField, defineArrayMember } from 'sanity';

export const resourceSection = defineType({
  type: 'object',
  name: 'resourceSection',
  preview: {
    select: {
        title: '', 
    },
    prepare(selection) {
        return {
        title: selection.title || 'Resource',
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
      type: 'array',
      name: 'items',
      title: 'Items',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            // defineField({
            //     title: 'Title',
            //     name: 'title',
            //     type: 'object',
            //     fields: [
            //       { name: 'en', title: 'English', type: 'string', validation: Rule => Rule.required().error(`English Title Required`)  },
            //       { name: 'ar', title: 'Arabic', type: 'string', validation: Rule => Rule.required().error(`Arabic Title Required`)  },
            //     ],
            // }),

                defineField({
                  name: 'title',
                  title: 'Title',
                  type: 'object',
                  fields: [
                    { name: 'en', title: 'English', type: 'string', validation: Rule => Rule.required().error(`English Title Required`)  },
                    { name: 'ar', title: 'Arabic', type: 'string', validation: Rule => Rule.required().error(`Arabic Title Required`)  },
                  ],
                }),
                // defineField({
                //   name: 'type',
                //   title: 'Type',
                //   type: 'string',
                // }),
            defineField({
              type: "date",
              name: "date",
              title: "Date",
              options: {
                dateFormat: "YYYY-MM-DD",
              },
            }),
                defineField({
                  name: 'file',
                  title: 'Upload File',
                  type: 'object',
                  fields: [
                    { 
                      name: 'en', 
                      title: 'English', 
                      type: 'file', 
                      options: {
                        accept: '.pdf,.doc,.docx,.pptx,.xlsx',
                      },
                      validation: Rule => Rule.required().error(`English File Required`)  
                    },
                    { 
                      name: 'ar', 
                      title: 'Arabic', 
                      type: 'file', 
                      options: {
                        accept: '.pdf,.doc,.docx,.pptx,.xlsx',
                      },
                      validation: Rule => Rule.required().error(`Arabic File Required`)  
                    },
                  ],
                }),
                // defineField({
                //   name: 'isAnchorBlank',
                //   title: 'is AnchorBlank',
                //   type: 'boolean',
                //   initialValue: true,
                // }),
              ],
           preview: {
            select: {
              title: "title.en",
            },
            prepare({ title,}) {
              return {
                title: title || "Untitled Resource",
                media : null
              };
            },
          },             
        })
        
      ],
      
      options: {
        layout: 'list',
      },
    }),
  ],
});
