import { defineType, defineField, defineArrayMember } from "sanity";

export const keyFiguresSection = defineType({
  type: "object",
  name: "keyFiguresSection",
  preview: {
    select: {
      title: "",
    },
    prepare(selection) {
      return {
        title: selection.title || "Key Figures Section",
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
      name: "title",
      title: "Title",
      type: "object",
      fields: [
        { name: "en", title: "English", type: "string" },
        { name: "ar", title: "Arabic", type: "string" },
      ],
    }),
    // defineField({
    //   name: "image",
    //   title: "Image",
    //   type: "image",
    // }),
    defineField({
      name: "items",
      title: "Cards",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "item",
          fields: [
            defineField({
              name: "image",
              title: "Icon",
              type: "image",
            }),
            defineField({
              name: "title",
              title: "Title",
              type: "object",
              fields: [
                { name: "en", title: "English", type: "string" },
                { name: "ar", title: "Arabic", type: "string" },
              ],
            }),
            // defineField({
            //   name: "preImage",
            //   title: "Enable Pre Image",
            //   type: "boolean",
            // }),
            defineField({
              type: "boolean",
              name: "isPreTextSmall",
              title: "Is Small Pre Text",
              initialValue: false,
            }),
            defineField({
              name: "preText",
              title: "Pre Text",
              type: "object",
              fields: [
                {
                  name: "isRiyalEn",
                  title: "Is PreText Riyal Currency?(type SAR in field and enable this check to render SAR currency)",
                  type: "boolean",
                },
                { name: "en", title: "English", type: "string" },
                {
                  name: "isRiyalAr",
                  title: "Is PreText Riyal Currency?(type SAR in field and enable this check to render SAR currency)",
                  type: "boolean",
                },                
                { name: "ar", title: "Arabic", type: "string" },
              ],
            }),
            defineField({
              name: "isCounterEnable",
              title: "Enable Counter (For Numeric Values Only)",
              type: "boolean",
            }),
            defineField({
              name: "text",
              title: "Text",
              type: "object",
              fields: [
                { name: "en", title: "English", type: "string" },
                { name: "ar", title: "Arabic", type: "string" },
              ],
            }),
            defineField({
              type: "boolean",
              name: "isPostTextSmall",
              title: "Is Small Post Text",
              initialValue: false,
            }),
            defineField({
              name: "postText",
              title: "Post Text",
              type: "object",
              fields: [
                {
                  name: "isRiyalEn",
                  title: "Is PostText Riyal Currency?(type SAR in field and enable this check to render SAR currency)",
                  type: "boolean",
                },
                { name: "en", title: "English", type: "string" },
                {
                  name: "isRiyalAr",
                  title: "Is PostText Riyal Currency?(type SAR in field and enable this check to render SAR currency)",
                  type: "boolean",
                },
                { name: "ar", title: "Arabic", type: "string" },
              ],
            }),
          ],
          preview: {
            select: {
              value: "title.en",
            },
            prepare({ value }) {
              return {
                title: value,
              };
            },
          },
        }),
      ],
    }),
  ],
});
