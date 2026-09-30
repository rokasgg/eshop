import type { StructureResolver } from 'sanity/structure'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      // Singletons
      S.listItem()
        .title('Home Page')
        .child(S.document().schemaType('homePage').documentId('homePage')),
      S.listItem()
        .title('Site Settings')
        .child(S.document().schemaType('siteSettings').documentId('siteSettings')),
      S.divider(),
      // Collections
      S.documentTypeListItem('collection').title('Collections'),
      S.documentTypeListItem('category').title('Categories'),
      S.documentTypeListItem('tea').title('Teas'),
    ])
