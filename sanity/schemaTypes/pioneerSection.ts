import { defineType, defineField, defineArrayMember } from "sanity";

export const pioneerSection = defineType({
    type: "object",
    name: "pioneerSection",
    preview: {
        select: {
            title: "",
        },
        prepare(selection) {
            return {
                title: selection.title || "Pioneer Section",
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
        defineField({
            type: 'array',
            name: 'items',
            title: 'Items',
            of: [
                defineArrayMember({
                    type: 'object',
                    fields: [
                        defineField({
                            name: 'title',
                            title: 'Title',
                            type: 'object',
                            fields: [
                                { name: 'en', title: 'English', type: 'string', validation: Rule => Rule.required().error(`English Title Required`) },
                                { name: 'ar', title: 'Arabic', type: 'string', validation: Rule => Rule.required().error(`Arabic Title Required`) },
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
                    ],
                                 preview: {
                                        select: {
                                            title: "title.en",
                                        },
                                        prepare(selection) {
                                            return {
                                                title: selection.title,
                                            };
                                        },
                                    },                   
                    
                }),
            ],
            options: {
                layout: 'list',
            },
        }),
    ],
});
