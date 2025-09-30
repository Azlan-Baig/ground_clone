import { defineType, defineField, defineArrayMember } from "sanity";

export const leadershipMessageSection = defineType({
  type: "object",
  name: "leadershipMessageSection",
  preview: {
    select: {
      title: "",
    },
    prepare(selection) {
      return {
        title: selection.title || "Leadership Message Section",
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
      name: "author",
      title: "Leadership Message",
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
              title: "Name",
              name: "name",
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
              title: "Designation",
              name: "designation",
              type: "object",
              fields: [
                {
                  name: "en",
                  title: "English",
                  type: "string",
                  validation: (Rule) =>
                    Rule.required().error(`English Designation Required`),
                },
                {
                  name: "ar",
                  title: "Arabic",
                  type: "string",
                  validation: (Rule) =>
                    Rule.required().error(`Arabic Designation Required`),
                },
              ],
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
            defineField({
              type: "image",
              name: "image",
              title: "Image",
              options: {
                hotspot: true,
              },
              validation: (rule) => rule.required().error(`Image Required`),
            }),
            defineField({
              type: "image",
              name: "imageMobile",
              title: "Image Mobile",
              options: {
                hotspot: true,
              },
            }),
            // defineField({
            //     type: 'object',
            //     name: 'cta',
            //     title: 'Cta',
            //     fields: [
            //         defineField({
            //             title: 'Title',
            //             name: 'title',
            //             type: 'object',
            //             fields: [
            //                 { name: 'en', title: 'English', type: 'string', validation: Rule => Rule.required().error(`English Title Required`) },
            //                 { name: 'ar', title: 'Arabic', type: 'string', validation: Rule => Rule.required().error(`Arabic Title Required`) },
            //             ],
            //         }),
            //         defineField({
            //             name: 'href',
            //             type: 'object',
            //             title: 'CTA URL',
            //             fields: [
            //               { name: 'en', title: 'English', type: 'string', validation: Rule => Rule.required().error('English CTA URL is required') },
            //               { name: 'ar', title: 'Arabic', type: 'string', validation: Rule => Rule.required().error('Arabic CTA URL is required') },
            //             ],
            //           }),
            //     ],
            // }),
          ],
          preview: {
            select: {
              title: "name.en",
              media: "image",
            },
            prepare({ title, media }) {
              return {
                title: title || "No Name",
                media,
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
