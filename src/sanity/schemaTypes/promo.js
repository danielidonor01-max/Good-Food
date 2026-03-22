import { defineType, defineField } from 'sanity';

export const promo = defineType({
  name: 'promo',
  title: 'Promotions',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: Rule => Rule.required() }),
    defineField({ name: 'description', title: 'Description', type: 'text' }),
    defineField({ name: 'image', title: 'Image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'CTA_text', title: 'CTA Text', type: 'string' }),
    defineField({ name: 'CTA_link', title: 'CTA Link', type: 'string' }),
    defineField({ 
      name: 'trigger_type', title: 'Trigger Type', type: 'string',
      options: { list: [ { title: 'Time Delay', value: 'time_delay' }, { title: 'Interaction', value: 'interaction' } ] },
      initialValue: 'time_delay'
    }),
    defineField({ name: 'trigger_value', title: 'Trigger Value (seconds)', type: 'number' }),
    defineField({ name: 'is_active', title: 'Is Active', type: 'boolean', initialValue: true })
  ],
  preview: { select: { title: 'title', media: 'image' } }
});
