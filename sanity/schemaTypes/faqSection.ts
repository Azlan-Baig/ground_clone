import { defineType, defineField, defineArrayMember } from "sanity";

export const faqSection = defineType({
  type: "object",
  name: "faqSection",
  preview: {
    select: {
      title: "",
    },
    prepare(selection) {
      return {
        title: selection.title || "FAQ",
      };
    },
  },
  fields: [
    defineField({
      title: "Title",
      name: "title",
      type: "object",
      fields: [
        {
          name: "en",
          title: "English",
          type: "string",
          validation: (Rule) => Rule.required().error(`English Title Required`),
        },
        {
          name: "ar",
          title: "Arabic",
          type: "string",
          validation: (Rule) => Rule.required().error(`Arabic Title Required`),
        },
      ],
    }),
    defineField({
      type: "array",
      name: "faqs",
      title: "Faqs",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              title: "Title",
              name: "title",
              type: "object",
              fields: [
                {
                  name: "en",
                  title: "English",
                  type: "string",
                  validation: (Rule) =>
                    Rule.required().error(`English Title Required`),
                },
                {
                  name: "ar",
                  title: "Arabic",
                  type: "string",
                  validation: (Rule) =>
                    Rule.required().error(`Arabic Title Required`),
                },
              ],
            }),
            defineField({
              name: "description",
              title: "Description",
              type: "object",
              fields: [
                {
                  name: "en",
                  title: "English",
                  type: "array",
                  of: [{ type: "block" }],
                },
                {
                  name: "ar",
                  title: "Arabic",
                  type: "array",
                  of: [{ type: "block" }],
                },
              ],
            }),
          ],
          preview: {
            select: {
              title: "title.en",
            },
            prepare(selection) {
              return {
                title: selection.title || "FAQ",
              };
            },
          },
        }),
      ],
    }),
    // defineField({
    //     type: 'object',
    //     name: 'cta',
    //     title: 'Cta',
    //     fields: [
    //       defineField({
    //         title: 'Title',
    //         name: 'title',
    //         type: 'object',
    //         fields: [
    //           { name: 'en', title: 'English', type: 'string', validation: Rule => Rule.required().error(`English Title Required`)  },
    //           { name: 'ar', title: 'Arabic', type: 'string', validation: Rule => Rule.required().error(`Arabic Title Required`)  },
    //         ],
    //       }),
    //       defineField({
    //         name: 'file',
    //         title: 'Upload File',
    //         type: 'object',
    //         fields: [
    //           {
    //             name: 'en',
    //             title: 'English',
    //             type: 'file',
    //             options: {
    //               accept: '.pdf,.doc,.docx,.pptx,.xlsx',
    //             },
    //             validation: Rule => Rule.required().error(`English File Required`)
    //           },
    //           {
    //             name: 'ar',
    //             title: 'Arabic',
    //             type: 'file',
    //             options: {
    //               accept: '.pdf,.doc,.docx,.pptx,.xlsx',
    //             },
    //             validation: Rule => Rule.required().error(`Arabic File Required`)
    //           },
    //         ],
    //       }),
    // //       defineField({
    // //         type: 'string',
    // //         name: 'key',
    // //         title: 'Key',
    // //       }),
    //     ],
    //   }),
  ],
});
