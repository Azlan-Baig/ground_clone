import { defineType, defineField, defineArrayMember } from "sanity";

export const awardsSection = defineType({
  type: "object",
  name: "awardsSection",
  preview: {
    select: {
      title: "",
    },
    prepare(selection) {
      return {
        title: selection.title || "Awards And Certificates",
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
      name: "cards",
      title: "Cards",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "card",
          fields: [
            defineField({
              name: "image",
              title: "Image",
              type: "image",
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
              enDesc: "description.en",
              media: "image",
            },
            prepare({ enDesc, media }) {
              let title = "Awards And Certificates";

              if (enDesc && enDesc[0]?.children) {
                title = enDesc[0].children
                  .map((child: any) => child.text)
                  .join(" ");
              }

              return {
                title,
                media,
              };
            },
          },
        }),
      ],
    }),
  ],
});
