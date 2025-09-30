import { defineType, defineField, defineArrayMember } from "sanity";

export const companyOverviewSection = defineType({
  type: "object",
  name: "companyOverviewSection",
  preview: {
    select: {
      title: "",
    },
    prepare(selection) {
      return {
        title: selection.title || "Company Overview Section",
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
      type: "object",
      name: "description",
      title: "Description",
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
      type: "image",
      name: "image",
      title: "Image",
    }),
    defineField({
      type: "image",
      name: "imageMobile",
      title: "Image Mobile",
    }),
    // defineField({
    //   name: "video",
    //   title: "Upload Video",
    //   type: "object",
    //   fields: [
    //     {
    //       name: "en",
    //       title: "English",
    //       type: "file",
    //       options: {
    //         accept: "video/*",
    //       },
    //     },
    //     {
    //       name: "ar",
    //       title: "Arabic",
    //       type: "file",
    //       options: {
    //         accept: "video/*",
    //       },
    //     },
    //   ],
    // }),
    // defineField({
    //   name: "ctaText",
    //   title: "CTA Text",
    //   type: "object",
    //   fields: [
    //     { name: "en", title: "English", type: "string" },
    //     { name: "ar", title: "Arabic", type: "string" },
    //   ],
    // }),
  ],
});
