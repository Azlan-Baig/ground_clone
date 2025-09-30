import { defineType, defineField, defineArrayMember } from "sanity";

export const teamSection = defineType({
  type: "object",
  name: "teamSection",
  title: "Team Section",
  preview: {
    select: {
      title: "title.en",
    },
    prepare({ title }) {
      return {
        title: title || "Team Section",
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
          validation: (Rule) => Rule.required().error("English Title Required"),
        },
        {
          name: "ar",
          title: "Arabic",
          type: "string",
          validation: (Rule) => Rule.required().error("Arabic Title Required"),
        },
      ],
    }),
    defineField({
      type: "object",
      name: "closeButtonText",
      title: "Close Button Text",
      fields: [
        {
          name: "en",
          title: "English",
          type: "string",
          validation: (Rule) => Rule.required().error("English Title Required"),
        },
        {
          name: "ar",
          title: "Arabic",
          type: "string",
          validation: (Rule) => Rule.required().error("Arabic Title Required"),
        },
      ],
    }),
    defineField({
      type: "array",
      name: "teams",
      title: "Teams",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              type: "object",
              name: "title",
              title: "Title",
              fields: [
                {
                  name: "en",
                  title: "English",
                  type: "string",
                  validation: (Rule) =>
                    Rule.required().error("English Title Required"),
                },
                {
                  name: "ar",
                  title: "Arabic",
                  type: "string",
                  validation: (Rule) =>
                    Rule.required().error("Arabic Title Required"),
                },
              ],
            }),
            defineField({
              name: "disableTeamPopup",
              title: "Disable Team Popup",
              type: "boolean",
              initialValue: false,
            }),
            defineField({
              type: "array",
              name: "teamMembers",
              title: "Team Members",
              of: [
                defineArrayMember({
                  type: "object",
                  fields: [
                    defineField({
                      title: "Name",
                      name: "name",
                      type: "object",
                      fields: [
                        {
                          name: "en",
                          title: "English",
                          type: "string",
                          validation: (Rule) =>
                            Rule.required().error("English Name Required"),
                        },
                        {
                          name: "ar",
                          title: "Arabic",
                          type: "string",
                          validation: (Rule) =>
                            Rule.required().error("Arabic Name Required"),
                        },
                      ],
                    }),

                    defineField({
                      name: "designation",
                      title: "Designation",
                      type: "object",
                      fields: [
                        { name: "en", title: "English", type: "string" },
                        { name: "ar", title: "Arabic", type: "string" },
                      ],
                    }),

                    defineField({
                      type: "image",
                      name: "image",
                      title: "Image",
                      options: { hotspot: true },
                      validation: (rule) =>
                        rule.required().error("Image Required"),
                    }),

                    defineField({
                      type: "object",
                      name: "content",
                      title: "Content",
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
                      title: "name.en",
                      subtitle: "designation.en",
                      media: "image",
                    },
                    prepare({ title, subtitle, media }) {
                      return {
                        title: title || "No Name",
                        subtitle: subtitle || "No Designation",
                        media,
                      };
                    },
                  },
                }),
              ],
              options: {
                layout: "list",
              },
            }),
          ],
          preview: {
            select: {
              title: "title.en",
            },
            prepare({ title }) {
              return {
                title: title || "Unnamed Team",
              };
            },
          },
        }),
      ],
      options: {
        layout: "list",
      },
    }),
  ],
});
