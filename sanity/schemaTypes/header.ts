import { defineType, defineField, defineArrayMember } from "sanity";

export const header = defineType({
  type: "object",
  name: "header",
  preview: {
    select: {
      title: "",
    },
    prepare(selection) {
      return {
        title: selection.title || "Header",
      };
    },
  },
  fields: [
    defineField({
      type: "array",
      name: "languages",
      title: "Languages",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              type: "string",
              name: "title",
              title: "Language Title",
            }),
            defineField({
              type: "string",
              name: "code",
              title: "Language Code",
            }),
          ],
        }),
      ],
    }),
    defineField({
      type: "image",
      name: "logo",
      title: "Logo",
      options: { hotspot: true },
    }),
    defineField({
      type: "array",
      name: "menu",
      title: "Menu Items",
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
              type: "string",
              name: "sectionType",
              title: "Select Section Type",
              options: {
                list: [
                  { title: "Header", value: "header" },
                  { title: "Banner Section", value: "bannerSection" },
                  { title: "Timeline Section", value: "timelineSection" },
                  { title: "Investment Section", value: "investmentSection" },
                  {
                    title: "Leadership Section",
                    value: "leadershipMessageSection",
                  },
                  { title: "Team Section", value: "teamSection" },
                  { title: "Subscribe Section", value: "subscribeSection" },
                  { title: "FAQ Section", value: "faqSection" },
                  { title: "Resource Section", value: "resourceSection" },
                  { title: "Financial Advisors Section", value: "financialAdvisors" },
                  {
                    title: "Company Overview Section ",
                    value: "companyOverviewSection",
                  },
                  {
                    title: "Key Figures Section",
                    value: "keyFiguresSection"
                  },
                  { title: "Get In Touch Section", value: "getInTouchSection" },
                  { title: "About The IPO", value: "aboutTheIpo" },
                  { title: "Footer", value: "footer" },
                ],
              },
            }),
            {
              type: "boolean",
              name: "customUrlEnable",
              title: "Enable Custom URL",
              initialValue: false, // Default value
            },
            {
              type: "object",
              name: "href",
              title: "Custom URL",
              hidden: ({ parent }: { parent: { customUrlEnable?: boolean } }) =>
                !parent?.customUrlEnable, // Type the parent object
              fields: [
                {
                  name: "en",
                  title: "English",
                  type: "string",
                  validation: (Rule: any) =>
                    Rule.custom(
                      (
                        value: string,
                        context: { parent?: { customUrlEnable?: boolean } }
                      ) => {
                        return context?.parent?.customUrlEnable && !value
                          ? "English CTA URL is required"
                          : true;
                      }
                    ),
                },
                {
                  name: "ar",
                  title: "Arabic",
                  type: "string",
                  validation: (Rule: any) =>
                    Rule.custom(
                      (
                        value: string,
                        context: { parent?: { customUrlEnable?: boolean } }
                      ) => {
                        return context?.parent?.customUrlEnable && !value
                          ? "Arabic CTA URL is required"
                          : true;
                      }
                    ),
                },
              ],
            },
            {
              type: "image",
              name: "icon",
              title: "Icon",
              options: { hotspot: true },
              hidden: ({ parent }: { parent: { customUrlEnable?: boolean } }) =>
                !parent?.customUrlEnable, // Type the parent object
            },
          ],
          preview: {
            select: {
              title: "title.en",
              sectionType: "sectionType",
            },
            prepare({ title, sectionType }) {
              return {
                title: title || "Untitled",
                subtitle: sectionType,
              };
            },
          },
        }),
      ],
    }),

    {
      type: "ctaType",
      name: "cta",
      title: "Call To Action",
    },
    defineField({
      type: "array",
      name: "socialLinks",
      title: "Social Links",
      of: [
        defineArrayMember({
          type: "object",
          preview: {
            select: {
              title: "url",
              media: "icon",
            },
            prepare(selection) {
              const { title, media } = selection;
              return {
                title: title || "No URL",
                media: media,
              };
            },
          },
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
              options: { hotspot: true },
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
        }),
      ],
      // options: {
      //   layout: 'grid',
      // }
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
  ],
});
