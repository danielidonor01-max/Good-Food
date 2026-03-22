import { defineType, defineField } from 'sanity';

export const category = defineType({
  name: 'category',
  title: 'Categories',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Name', type: 'string', validation: Rule => Rule.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'name' } }),
    defineField({ name: 'order', title: 'Display Order', type: 'number', initialValue: 0 }),
    defineField({ name: 'icon', title: 'Icon Name (Lucide)', type: 'string' })
  ],
  preview: { select: { title: 'name', subtitle: 'slug.current' } }
});
