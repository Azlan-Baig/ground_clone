import { defineType, defineField, defineArrayMember } from 'sanity'

export const disclaimerPage = defineType({
  type: "document",
  name: "disclaimerPage",
  fields: [
    defineField({
      type: "string",
      name: "title",
    }),
    {
      type: "boolean",
      name: "isDisclaimerEnabled",
      title: "Enable Disclaimer",
      initialValue: false,
    },      
    defineField({
      name: 'allCountries',
      type: 'array',
      title: 'All Countries',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'country',
          fields: [
            {
              name: 'label',
              type: 'object',
              title: 'Country Name',
              fields: [
                { name: 'en', title: 'Country Name (English)', type: 'string', validation: Rule => Rule.required().error(`English Title Required`) },
                { name: 'ar', title: 'Country Name (Arabic)', type: 'string', validation: Rule => Rule.required().error(`Arabic Title Required`) },
              ],
              validation: Rule => Rule.required().error('Country name is required in both languages')
            },
            { name: 'value', type: 'string', title: 'Country Code', validation: Rule => Rule.required() },
          ],
        }),
      ],
      validation: Rule => Rule.required().min(1).error('At least one country is required in all countries'),
    }),
    defineField({
      name: 'restrictedCountries',
      type: 'array',
      title: 'Restricted Countries',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'restrictedCountry',
          fields: [
            {
              name: 'label',
              type: 'object',
              title: 'Country Name',
              fields: [
                { name: 'en', title: 'Country Name (English)', type: 'string', validation: Rule => Rule.required().error(`English Title Required`) },
                { name: 'ar', title: 'Country Name (Arabic)', type: 'string', validation: Rule => Rule.required().error(`Arabic Title Required`) },
              ],
              validation: Rule => Rule.required().error('Country name is required in both languages')
            },
            { name: 'value', type: 'string', title: 'Country Code', validation: Rule => Rule.required() },
          ],
        }),
      ],
      validation: Rule => Rule.required().min(1).error('At least one restricted country is required'),
    }),
    defineField({
      name: "disclaimerPage1",
      type: "disclaimerPage1",
      title: "Disclaimer Page 1",
    }),
    defineField({
      name: "disclaimerPage2",
      type: "disclaimerPage2",
      title: "Disclaimer Page 2",
    }),
    defineField({
      name: "disclaimerPage3",
      type: "disclaimerPage3",
      title: "Disclaimer Page 3",
    }),
  ],
});
