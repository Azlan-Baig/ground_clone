import { defineType, defineField, defineArrayMember } from "sanity";

export const sectorExpertiseSection = defineType({
  type: "object",
  name: "sectorExpertiseSection",
  preview: {
    select: {
      title: "",
    },
    prepare(selection) {
      return {
        title: selection.title || "Sector Experties Section",
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
              title: "Background Image",
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
            defineField({
              name: "subTitle",
              title: "Sub Title",
              type: "object",
              fields: [
                { name: "en", title: "English", type: "string" },
                { name: "ar", title: "Arabic", type: "string" },
              ],
            }),
            defineField({
              name: "representText",
              title: "Represent Text",
              type: "object",
              fields: [
                { name: "en", title: "English", type: "string" },
                { name: "ar", title: "Arabic", type: "string" },
              ],
            }),
            defineField({
              name: "coreText",
              title: "Core Text",
              type: "object",
              fields: [
                { name: "en", title: "English", type: "string" },
                { name: "ar", title: "Arabic", type: "string" },
              ],
            }),
            // defineField({
            //   name: "description",
            //   title: "Description",
            //   type: "object",
            //   fields: [
            //     {
            //       name: "en",
            //       title: "English",
            //       type: "array",
            //       of: [{ type: "block" }],
            //     },
            //     {
            //       name: "ar",
            //       title: "Arabic",
            //       type: "array",
            //       of: [{ type: "block" }],
            //     },
            //   ],
            // }),
            // defineField({
            //   name: "preImage",
            //   title: "Enable Pre Image",
            //   type: "boolean",
            // }),
            defineField({
              name: "preText",
              title: "Pre Text",
              type: "object",
              fields: [
                { name: "en", title: "English", type: "string" },
                { name: "ar", title: "Arabic", type: "string" },
              ],
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
              name: "postText",
              title: "Post Text",
              type: "object",
              fields: [
                { name: "en", title: "English", type: "string" },
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
