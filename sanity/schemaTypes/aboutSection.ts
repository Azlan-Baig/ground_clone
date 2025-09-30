import { defineType, defineField, defineArrayMember } from 'sanity';

export const aboutSection = defineType({
  type: 'object',
  name: 'aboutSection',
  preview: {
    select: {
        title: '', 
    },
    prepare(selection) {
        return {
        title: selection.title || 'About',
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
    }),
  //   defineField( {
  //     name: 'subtitle',
  //     title: 'Sub Title',
  //     type: 'object',
  //       fields: [
  //       { name: 'en', title: 'English', type: 'string' },
  //       { name: 'ar', title: 'Arabic', type: 'string' },
  //     ],
  // }),
  //   defineField({
  //       type: 'image',
  //       name: 'image',
  //       title: 'Image',
  //       options: {
  //         hotspot: true, 
  //       },
  //       validation: (rule) => rule
  //       .required()
  //       .error(`Image Required`),
  //   }),
  //   defineField({
  //     type: 'image',
  //     name: 'mobileImage',
  //     title: 'Mobile Image',
  //     options: {
  //       hotspot: true, 
  //     },
  //     validation: (rule) => rule
  //     .required()
  //     .error(`Image Required`),
  // }),
    defineField({
      type: "object",
      name: "description",
      title: "Description",
      fields: [
        { name: 'en', title: 'English', type: 'array', of: [{ type: 'block' }] },
        { name: 'ar', title: 'Arabic', type: 'array', of: [{ type: 'block' }] },
      ],  
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
    //           name: 'href',
    //           type: 'object',
    //           title: 'CTA URL',
    //           fields: [
    //             { name: 'en', title: 'English', type: 'string', validation: Rule => Rule.required().error('English CTA URL is required') },
    //             { name: 'ar', title: 'Arabic', type: 'string', validation: Rule => Rule.required().error('Arabic CTA URL is required') },
    //           ],
    //         }),
    //         // defineField({
    //         //     type: 'image',
    //         //     name: 'icon',
    //         //     title: 'Icon',
    //         //     options: { hotspot: true },
    //         // }),
    //     ],
    // }),
  ],
});
