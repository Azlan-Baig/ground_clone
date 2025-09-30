import { defineType, defineField, defineArrayMember } from "sanity";

export const timelineSection = defineType({
  type: "object",
  name: "timelineSection",
  preview: {
    select: {
      title: "",
    },
    prepare(selection) {
      return {
        title: selection.title || "Timeline",
      };
    },
  },
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
      name: "stats",
      title: "Stats",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              type: "object",
              name: "title",
              title: "Title",
              fields: [
                { name: "en", title: "English", type: "string" },
                { name: "ar", title: "Arabic", type: "string" },
              ],
            }),
             defineField({
              type: "object",
              name: "countText",
              title: "Count Text (eg 01)",
              fields: [
                { name: "en", title: "English", type: "string" },
                { name: "ar", title: "Arabic", type: "string" },
              ],
            }),
            defineField({
              type: "date",
              name: "date",
              title: "Start Date",
              options: {
                dateFormat: "YYYY-MM-DD",
              },
              validation: (Rule) =>
                Rule.custom((date, context) => {
                  const { endDate } = context.parent as { endDate?: string };

                  // If no end date is set, start date is always valid
                  if (!endDate) return true;

                  // If no start date is set but end date exists, it's invalid
                  if (!date) return "Start date should come first";

                  // Compare dates
                  const start = new Date(date);
                  const end = new Date(endDate);

                  if (start >= end) {
                    return "Start date must be before end date";
                  }

                  return true;
                }),
            }),
            defineField({
              type: "date",
              name: "endDate",
              title: "End Date",
              options: {
                dateFormat: "YYYY-MM-DD",
              },
              validation: (Rule) =>
                Rule.custom((endDate, context) => {
                  const { date } = context.parent as { date?: string };

                  // If no start date is set, end date is always valid
                  if (!date) return true;

                  // If no end date is set but start date exists, it's valid (optional end date)
                  if (!endDate) return true;

                  // Compare dates
                  const start = new Date(date);
                  const end = new Date(endDate);

                  if (start >= end) {
                    return "End date should come after start date";
                  }

                  return true;
                }),
            }),
            defineField({
              type: "object",
              name: "subText",
              title: "Alternate Text (subText will hide the date)",
              fields: [
                { name: "en", title: "English", type: "string" },
                { name: "ar", title: "Arabic", type: "string" },
              ],
            }),
            // defineField({
            //   type: 'object',
            //   name: 'subtitle',
            //   title: 'Sub Title (Optional)',
            //   fields: [
            //     { name: 'en', title: 'English', type: 'string' },
            //     { name: 'ar', title: 'Arabic', type: 'string' },
            //   ],
            // }),
          ],
          preview: {
            select: {
              en: "title.en",
              ar: "title.ar",
              date: "date",
            },
            prepare({ en, ar, date }) {
              return {
                title: en || ar || "No Title",
                subtitle: date || "",
                media: null,
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
