import { defineType, defineField, defineArrayMember } from "sanity";

export const communitiesSection = defineType({
  type: "object",
  name: "communitiesSection",
  preview: {
    select: {
      title: "",
    },
    prepare(selection) {
      return {
        title: selection.title || "Our Communities",
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
        {
          name: "ar",
          title: "Arabic",
          type: "array",
          of: [{ type: "block" }],
        },
      ],
    }),
    defineField({
      name: "gallery",
      title: "Gallery",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "location",
          fields: [
            defineField({
              name: "images",
              title: "Images",
              type: "array",
              of: [{ type: "image" }],
            }),
            defineField({
              name: "items",
              title: "Items",
              type: "array",
              of: [
                defineArrayMember({
                  type: "object",
                  name: "item",
                  fields: [
                    defineField({
                      name: "locationLabel",
                      title: "Location Label",
                      type: "object",
                      fields: [
                        { name: "en", title: "English", type: "string" },
                        { name: "ar", title: "Arabic", type: "string" },
                      ],
                    }),
                    defineField({
                      name: "locationValue",
                      title: "Location Value",
                      type: "object",
                      fields: [
                        { name: "en", title: "English", type: "string" },
                        { name: "ar", title: "Arabic", type: "string" },
                      ],
                    }),
                    defineField({
                      name: "buildingLabel",
                      title: "Building Type Label",
                      type: "object",
                      fields: [
                        { name: "en", title: "English", type: "string" },
                        { name: "ar", title: "Arabic", type: "string" },
                      ],
                    }),
                    defineField({
                      name: "buildingValue",
                      title: "Building Type Value",
                      type: "object",
                      fields: [
                        { name: "en", title: "English", type: "string" },
                        { name: "ar", title: "Arabic", type: "string" },
                      ],
                    }),
                    defineField({
                      name: "propertiesLabel",
                      title: "Properties Label",
                      type: "object",
                      fields: [
                        { name: "en", title: "English", type: "string" },
                        { name: "ar", title: "Arabic", type: "string" },
                      ],
                    }),
                    defineField({
                      name: "propertiesValue",
                      title: "Properties Value",
                      type: "object",
                      fields: [
                        { name: "en", title: "English", type: "string" },
                        { name: "ar", title: "Arabic", type: "string" },
                      ],
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),
      ],
    }),
  ],
});
