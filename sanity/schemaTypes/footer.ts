import { defineType, defineField, defineArrayMember } from "sanity";

export const footer = defineType({
  type: "object",
  name: "footer",
  preview: {
    select: {
      title: "",
    },
    prepare(selection) {
      return {
        title: selection.title || "Footer",
      };
    },
  },
  fields: [
    defineField({
      type: "image",
      name: "logo",
      title: "Logo",
      options: { hotspot: true },
    }),
    defineField({
      type: "object",
      name: "description",
      title: "Description",
      fields: [
        {
          name: "en",
          title: "English",
          type: "string",
        },
        { name: "ar", title: "Arabic", type: "string" },
      ],
    }),
    defineField({
      type: "array",
      name: "items",
      title: "Items",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              type: "image",
              name: "logo",
              title: "Logo",
              options: {
                hotspot: true,
              },
              validation: (rule) => rule.required().error(`Image Required`),
            }),
            defineField({
              name: "emailLabel",
              title: "Email Label",
              type: "object",
              fields: [
                { name: "en", title: "English", type: "string" },
                { name: "ar", title: "Arabic", type: "string" },
              ],
            }),
            defineField({
              type: "string",
              name: "email",
              title: "Email",
              validation: (Rule) =>
                Rule.email().error("Must be a valid email address"),
            }),
            defineField({
              name: "websiteLabel",
              title: "Website Label",
              type: "object",
              fields: [
                { name: "en", title: "English", type: "string" },
                { name: "ar", title: "Arabic", type: "string" },
              ],
            }),
            defineField({
              type: "string",
              name: "websiteUrl",
              title: "Website URL",
            }),
          ],
        }),
      ],
      options: {
        layout: "grid",
      },
    }),
    defineField({
      type: "object",
      name: "copyRightText",
      title: "CopyRight Text",
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
      type: "array",
      name: "socialLinks",
      title: "Social Links",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
          defineField({
              type: "string",
              name: "name",
              title: "Name",
            }),             
            defineField({
              type: "image",
              name: "icon",
              title: "Icon",
              options: {
                hotspot: true,
              },
              validation: (rule) => rule.required().error(`Image Required`),
            }),
            defineField({
              type: "url",
              name: "url",
              title: "URL",
              validation: (Rule) => Rule.error("Must be a valid URL"),
            }),
            defineField({
              type: "boolean",
              name: "isAnchorBlank",
              title: "is AnchorBlank",
              initialValue: true,
            }),
          ],
          preview: {
            select: {
              url: "url",
              icon: "icon",
            },
            prepare({ url, icon }) {
              return {
                title: url || "Social Link",
                media: icon,
              };
            },
          },
        }),
      ],
      options: {
        layout: "grid",
      },
    }),
  ],
});
