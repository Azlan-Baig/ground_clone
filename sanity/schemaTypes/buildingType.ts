import { defineType, defineField, defineArrayMember } from "sanity";

export const buildingType = defineType({
  type: "document",
  name: "buildingType",
  title: "Building Type",
  fields: [
    defineField({
      name: "title",
      title: "Category Title",
      type: "object",
      fields: [
        {
          name: "en",
          title: "English",
          type: "string",
          validation: (Rule) =>
            Rule.required().error(`English Category Title Required`),
        },
        {
          name: "ar",
          title: "Arabic",
          type: "string",
          validation: (Rule) =>
            Rule.required().error(`Arabic Category Title Required`),
        },
      ],
    }),
  ],
});
