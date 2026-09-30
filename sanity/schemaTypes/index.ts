import { type SchemaTypeDefinition } from 'sanity'
import { category } from './category'
import { tea } from './tea'
import { collection } from './collection'
import { homePage } from './homePage'
import { siteSettings } from './siteSettings'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [category, tea, collection, homePage, siteSettings],
}
