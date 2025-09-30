import { defineType, defineField, defineArrayMember } from "sanity";

export const bannerSection = defineType({
  type: "object",
  name: "bannerSection",
  preview: {
    select: {
      title: "",
    },
    prepare(selection) {
      return {
        title: selection.title || "Banner",
      };
    },
  },
  fields: [
    defineField({
      type: "image",
      name: "desktopSrc",
      title: "Desktop Image",
    }),
    defineField({
      type: "image",
      name: "mobileSrc",
      title: "Mobile Image",
    }),
    defineField({
      name: "backgroundVideoDesktop",
      title: "Desktop Video",
      type: "object",
      fields: [
        {
          name: "en",
          title: "English",
          type: "file",
          options: {
            accept: "video/*",
          },
        },
        {
          name: "ar",
          title: "Arabic",
          type: "file",
          options: {
            accept: "video/*",
          },
        },
      ],
    }),
    defineField({
      name: "backgroundVideoMobile",
      title: "Mobile Video",
      type: "object",
      fields: [
        {
          name: "en",
          title: "English",
          type: "file",
          options: {
            accept: "video/*",
          },
        },
        {
          name: "ar",
          title: "Arabic",
          type: "file",
          options: {
            accept: "video/*",
          },
        },
      ],
    }),
    defineField({
      type: "object",
      name: "title",
      title: "Title",
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
      type: "object",
      name: "subtitle",
      title: "Subtitle",
      fields: [
          { name: 'en', title: 'English', type: 'array', of: [{ type: 'block' }] },
          { name: 'ar', title: 'Arabic', type: 'array', of: [{ type: 'block' }] },
        ],
    }),
  ],
});
