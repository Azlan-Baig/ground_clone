import { defineType, defineField, defineArrayMember } from 'sanity';

export const subscribeSection = defineType({
  type: 'object',
  name: 'subscribeSection',
  preview: {
    select: {
        title: '', 
    },
    prepare(selection) {
        return {
        title: selection.title || 'Subscribe',
        };
    },
},
  fields: [
    defineField( {
        name: 'title',
        title: 'Title',
        type: 'object',
          fields: [
          { name: 'en', title: 'English', type: 'string' },
          { name: 'ar', title: 'Arabic', type: 'string' },
        ],
    },),
    defineField({
          name: "backgroundVideo",
          title: "Background Video",
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
      type: 'image',
      name: 'mobilePosterImage',
      title: 'Mobile Background Image',
      options: { hotspot: true },
      // validation: (rule) => rule
      // .required()
      // .error(`Image Required`),
  }),
  defineField({
      type: 'image',
      name: 'desktopPosterImage',
      title: 'Desktop Background Image',
      options: { hotspot: true },
      // validation: (rule) => rule
      // .required()
      // .error(`Image Required`),
  }),
    // defineField({
    //   type: 'image',
    //   name: 'image',
    //   title: 'Image',
    //   options: { hotspot: true },
    // }),
    // defineField({
    //     type: 'string',
    //     name: 'href',
    //     title: 'URL',
    // }),
    // defineField({
    //   name: 'buttonText',
    //   title: 'Button Text',
    //   type: 'object',
    //     fields: [
    //     { name: 'en', title: 'English', type: 'string' },
    //     { name: 'ar', title: 'Arabic', type: 'string' },
    //   ],
    // }),
    // defineField({
    //   type: 'string',
    //   name: 'type',
    //   title: 'Type',
    //   options: {
    //     list: [
    //       { title: "video", value: "video" },
    //       { title: "button", value: "button" },     
          
    //     ],
    //   },
    // }),
    defineField({
      type: 'object',
      name: 'cta',
      title: 'Cta',
      fields: [
        defineField({
          name: 'title',
          title: 'Title',
          type: 'object',
          fields: [
            { name: 'en', title: 'English', type: 'string', validation: Rule => Rule.required().error(`English Title Required`)  },
            { name: 'ar', title: 'Arabic', type: 'string', validation: Rule => Rule.required().error(`Arabic Title Required`)  },
          ],
        }),
        // defineField({
        //   name: "video",
        //   title: "Upload Video",
        //   type: "object",
        //   fields: [
        //     {
        //       name: "en",
        //       title: "English",
        //       type: "string",
        //       validation: Rule => Rule.required().error(`English Video Required`)
        //     },
        //     {
        //       name: "ar",
        //       title: "Arabic",
        //       type: "string",
        //       validation: Rule => Rule.required().error(`Arabic Video Required`)
        //     },
            
        //   ],
        // }),
        defineField({
          name: "video",
          title: "Upload Video",
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
          name: 'closeButton',
          title: 'Close Button Text',
          type: 'object',
          fields: [
            { name: 'en', title: 'English', type: 'string' },
            { name: 'ar', title: 'Arabic', type: 'string'},
          ],
        }),
      ],
    }),
  ],
});
