import { defineType, defineField, defineArrayMember } from 'sanity';

export const combo = defineType({
  name: 'combo',
  title: 'Combos',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'description', title: 'Description', type: 'text' }),
    defineField({ name: 'price', title: 'Price', type: 'number', validation: (Rule) => Rule.required() }),
    defineField({ name: 'image', title: 'Image', type: 'image', options: { hotspot: true } }),
    defineField({
      name: 'items',
      title: 'Included Items',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'type', title: 'Type (meal | protein | drink | extra)', type: 'string' }),
            defineField({ name: 'name', title: 'Name', type: 'string' })
          ]
        })
      ]
    }),
    defineField({ name: 'is_featured', title: 'Is Featured', type: 'boolean', initialValue: true }),
    defineField({ name: 'is_active', title: 'Is Active', type: 'boolean', initialValue: true })
  ],
  preview: { select: { title: 'title', subtitle: 'price', media: 'image' } }
});
