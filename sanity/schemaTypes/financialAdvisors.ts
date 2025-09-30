import { defineType, defineField, defineArrayMember } from 'sanity';

export const financialAdvisors = defineType({
  type: 'object',
  name: 'financialAdvisors',
  preview: {
    select: {
      title: '', 
    },
    prepare(selection) {
      return {
        title: selection.title || 'advisors',
      };
    },
  },
  fields: [
    defineField({
      name: "heading",
      title: "Heading",
      type: "object",
      fields: [
        { name: "en", title: "English", type: "string" },
        { name: "ar", title: "Arabic", type: "string" },
      ],
    }),
    defineField({
      type: 'object',
      name: 'title',
      title: 'Title',
      fields: [
        { name: "en", title: "English", type: "string", validation: Rule => Rule.required().error('English Title Required')},
        { name: "ar", title: "Arabic", type: "string", validation: Rule => Rule.required().error('English Title Required')},
      ],
    }),
    defineField({
      type: 'array',
      name: 'advisors',
      title: 'advisors',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              type: 'object',
              name: 'title',
              title: 'Title',
              fields: [
                { name: 'en', title: 'English', type: 'string', validation: Rule => Rule.required().error('English Title Required')  },
                { name: 'ar', title: 'Arabic', type: 'string', validation: Rule => Rule.required().error('Arabic Title Required')  },
              ], 
            }),
            defineField({
              type: 'boolean',
              name: 'isSlider',
              title: 'Enable Slider',
              initialValue: false,
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
                      .error('Image Required'),
                    }),
                    // defineField({
                    //   type: 'object',
                    //   name: 'title',
                    //   title: 'Title',
                    //   fields: [
                    //     { name: 'en', title: 'English', type: 'string' },
                    //     { name: 'ar', title: 'Arabic', type: 'string' },
                    //   ],
                    // }),
                    defineField({
                      type: 'object',
                      name: 'emailLabel',
                      title: 'Email Label',
                      fields: [
                        { name: 'en', title: 'English', type: 'string', validation: Rule => Rule.required().error('English Label Required')  },
                        { name: 'ar', title: 'Arabic', type: 'string', validation: Rule => Rule.required().error('Arabic Label Required')  },
                      ], 
                    }),
                    defineField({
                      type: 'string',
                      name: 'email',
                      title: 'Email',
                      validation: Rule => Rule.email().error('Must be a valid email address'),
                    }),
                    defineField({
                      type: 'object',
                      name: 'websiteLabel',
                      title: 'Website Label',
                      fields: [
                        { name: 'en', title: 'English', type: 'string', validation: Rule => Rule.required().error('English Label Required')  },
                        { name: 'ar', title: 'Arabic', type: 'string', validation: Rule => Rule.required().error('Arabic Label Required')  },
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
                layout: 'list',
              },
            }),
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
        }),
      ],
      
    }),
  ],
});