import { defineType, defineField, defineArrayMember } from 'sanity'

export const cookieBanner = defineType({
  type: "document",
  name: "cookieBanner",
  preview: {
    select: {
      title: '', 
    },
    prepare(selection) {
      return {
        title: selection.title || 'Cookie Banner',
      };
    },
  },
  fields: [
      {
        name: 'cookieBanner',
        title: 'cookie Banner Section',
        type: 'object',
        fields: [
            defineField({
              type: 'object',
              name: 'description1',
              title: 'Description',
              fields: [
                { name: 'en', title: 'English', type: 'array', of: [{ type: 'block' }] },
                { name: 'ar', title: 'Arabic', type: 'array', of: [{ type: 'block' }] },
              ],    
            }),
            defineField({
              type: 'object',
              name: 'allowButtonText',
              title: 'Allow Cookie Button Text',
              fields: [
                { name: 'en', title: 'English', type: 'string', validation: Rule => Rule.required().error('English Allow Cookie Button Text is required') },
                { name: 'ar', title: 'Arabic', type: 'string', validation: Rule => Rule.required().error('Arabic Allow Cookie Button Text is required') },
              ],
            }),
            defineField({
              type: 'object',
              name: 'DeclineButtonText',
              title: 'Decline Button Text',
              fields: [
                { name: 'en', title: 'English', type: 'string', validation: Rule => Rule.required().error('English Decline Button Text is required') },
                { name: 'ar', title: 'Arabic', type: 'string', validation: Rule => Rule.required().error('Arabic Decline Button Text is required') },
              ],
            }),
            
        ],
      },
     
  ],
});
