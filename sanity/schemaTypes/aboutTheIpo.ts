import { defineType, defineField, defineArrayMember } from "sanity";

export const aboutTheIpo = defineType({
  type: "object",
  name: "aboutTheIpo",
  preview: {
    select: {
      title: "",
    },
    prepare(selection) {
      return {
        title: selection.title || "About IPO",
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
        { name: "ar", title: "Arabic", type: "array", of: [{ type: "block" }] },
      ],
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
    }),
    defineField({
      name: "imageMobile",
      title: "Image Mobile",
      type: "image",
    }),
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
              name: "title",
              title: "Title",
              type: "object",
              fields: [
                { name: "en", title: "English", type: "string" },
                { name: "ar", title: "Arabic", type: "string" },
              ],
            }),
            defineField({
              name: "preFix",
              title: "prefix value",
              type: "object",
              fields: [
                { name: "en", title: "English", type: "string" },
                { name: "ar", title: "Arabic", type: "string" },
              ],
            }),
            defineField({
              name: "isCounterEnable",
              title: "Enable Counter (For Numeric Values Only)",
              type: "boolean",
            }),            
            defineField({
              name: "value",
              title: "Value",
              type: "object",
              fields: [
                { name: "en", title: "English", type: "string" },
                { name: "ar", title: "Arabic", type: "string" },
              ],
            }),
            defineField({
              name: "postFix",
              title: "PostFix Value",
              type: "object",
              fields: [
                { name: "en", title: "English", type: "string" },
                { name: "ar", title: "Arabic", type: "string" },
              ],
            }),
          ],
          preview: {
            select: {
              value: "value.en",
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
    defineField({
      name: "bottomText",
      title: "Bottom Text",
      type: "object",
      fields: [
        { name: "en", title: "English", type: "string" },
        { name: "ar", title: "Arabic", type: "string" },
      ],
    }),
  ],
});
