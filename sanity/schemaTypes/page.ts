import { defineType, defineField, defineArrayMember } from 'sanity'

export const page = defineType({
  type: "document",
  name: "page",
  fields: [
    defineField({
      type: "string",
      name: "title",
    }),
    defineField({
      type: "slug",
      name: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
    }),
    defineField({
      type: 'object',
      name: 'ogTitle',
      title: 'OG Title',
      fields: [
        { name: 'en', title: 'English', type: 'string', validation: Rule => Rule.required().error(`English OG Title Required`)  },
        { name: 'ar', title: 'Arabic', type: 'string', validation: Rule => Rule.required().error(`Arabic OG Title Required`)  },
      ],
    }),
    defineField({
      type: 'image',
      name: 'ogImage',
      title: 'OG Image',
      options: {
        hotspot: true, 
      },
      validation: (rule) => rule
      .required()
      .error(`Image Required`),
    }),
    defineField({
      type: 'object',
      name: 'metaTitle',
      title: 'Meta Title',
      fields: [
        { name: 'en', title: 'English', type: 'string', validation: Rule => Rule.required().error(`English Meta Title Required`)  },
        { name: 'ar', title: 'Arabic', type: 'string', validation: Rule => Rule.required().error(`Arabic Meta Title Required`)  },
      ],
    }),
    defineField({
      type: 'object',
      name: 'metaDescription',
      title: 'Meta Description',
      fields: [
        { name: 'en', title: 'English', type: 'string', validation: Rule => Rule.required().error(`English Meta Description Required`)  },
        { name: 'ar', title: 'Arabic', type: 'string', validation: Rule => Rule.required().error(`Arabic Meta Description Required`)  },
      ],
    }),
    defineField({
      type: 'string',
      name: 'gtmID',
      title: 'GTM ID',
    }),
    defineField({
      type: "array",
      name: "sections",
      title: "Page sections",
      of: [
        defineArrayMember({
          type: "header",
        }),
        defineArrayMember({
          type: "bannerSection",
        }),
        defineArrayMember({
          type: "aboutSection",
        }),
        defineArrayMember({
          type: "leadershipMessageSection",
        }),
        defineArrayMember({
          type: "journeySection",
        }),
        defineArrayMember({
          type: "timelineSection",
        }),
        defineArrayMember({
          type: "investmentTimeline",
        }),
        defineArrayMember({
          type: "teamSection",
        }),
        defineArrayMember({
          type: "subscribeSection",
        }),
        defineArrayMember({
          type: "faqSection",
        }),
        defineArrayMember({
          type: "resourceSection",
        }),
        defineArrayMember({
          type: "financialAdvisors",
        }),
        defineArrayMember({
          type: "getInTouchSection",
        }),
        defineArrayMember({
          type: "footer",
        }),
        defineArrayMember({
          type: "companyOverviewSection",
        }),
        defineArrayMember({
          type: "aboutTheIpo",
        }),
        defineArrayMember({
          type: "investmentSection",
        }),
        defineArrayMember({
          type: "communitiesSection",
        }),
        defineArrayMember({
          type: "awardsSection",
        }),
        defineArrayMember({
          type: "pioneerSection",
        }),
        defineArrayMember({
          type: "keyFiguresSection",
        }),
        defineArrayMember({
          type: "sectorExpertiseSection",
        }),
      ],
    }),
  ],
});
