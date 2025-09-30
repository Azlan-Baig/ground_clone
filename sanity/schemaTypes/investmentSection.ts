import { defineType, defineField, defineArrayMember } from "sanity";

export const investmentSection = defineType({
  type: "object",
  name: "investmentSection",
  preview: {
    select: {
      title: "",
    },
    prepare(selection) {
      return {
        title: selection.title || "Investment",
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
    // defineField({
    //     type: 'image',
    //     name: 'image',
    //     title: 'Image',
    //     options: {
    //       hotspot: true,
    //     },
    //     validation: (rule) => rule
    //     .required()
    //     .error(`Image Required`),
    // }),
    defineField({
      type: "array",
      name: "highlights",
      title: "Highlights",
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
                title: selection.title,
              };
            },
          },
        }),
      ],
    }),
  ],
});
