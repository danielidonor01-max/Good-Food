import { defineType, defineField } from 'sanity';

export const settings = defineType({
  name: 'settings',
  title: 'Global Settings',
  type: 'document',
  fields: [
    defineField({ name: 'modal_enabled', title: 'Enable Promo Modal', type: 'boolean', initialValue: true }),
    defineField({ name: 'modal_delay', title: 'Modal Delay (ms)', type: 'number', initialValue: 5000 }),
    defineField({ name: 'currency_symbol', title: 'Currency Symbol', type: 'string', initialValue: '₦' })
  ]
});
