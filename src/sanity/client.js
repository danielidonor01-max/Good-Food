import { createClient } from 'next-sanity'

export const client = createClient({
  projectId: 'demo1234', // Placeholder ID for structural purposes
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
})
