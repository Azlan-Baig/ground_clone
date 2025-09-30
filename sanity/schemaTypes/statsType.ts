import {defineField, defineType} from 'sanity'

export const statsType = defineType({
    name: 'statsType',
    title: 'Stats',
    type: 'object', 
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
        defineField({
            title: 'Count',
            name: 'count',
            type: 'object',
            fields: [
                { name: 'en', title: 'English', type: 'string', validation: Rule => Rule.required().error(`English Title Required`)  },
                { name: 'ar', title: 'Arabic', type: 'string', validation: Rule => Rule.required().error(`Arabic Title Required`)  },
            ],      
        }),
        defineField( {
            name: 'isValueInPercentage',
            title: 'is Value In Percentage',
            type: 'boolean'
        
        }),  
        defineField( {
            name: 'enableCounter',
            title: 'Enable Counter',
            type: 'boolean'
        
        }),  
        defineField( {
            name: 'isIconEnabled',
            title: 'Enable Icon',
            type: 'boolean',
            initialValue: true
        }),  
        defineField({
            title: 'Icon',
            name: 'icon',
            type: 'image',
            hidden: ({ parent }) => !parent?.isIconEnabled,
        }),
        defineField( {
            name: 'subtitle',
            title: 'Sub Title',
            type: 'object',
            fields: [
            { name: 'en', title: 'English', type: 'string' },
            { name: 'ar', title: 'Arabic', type: 'string'  },
            ],
        })
    ],
    preview: {
        select: {
            title: 'title.en', 
          },
          prepare(selection) {
            return {
              title: selection.title || 'No title',
            };
          },
    }
})