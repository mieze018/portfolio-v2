import type { PageObject, propertiesTypes } from 'libs/@type/api/notion'

export const getProperties = (
  object: PageObject,
  { name, type }: { name: string; type: propertiesTypes }
) => {
  if (!object?.properties[name]) return null
  switch (type) {
    case 'select':
      return object.properties[name].select?.name
    case 'title':
      return object.properties[name].title[0]?.plain_text
    case 'rich_text':
      return object.properties[name].rich_text[0]?.plain_text
    case 'number':
      return object.properties[name].number
    case 'multi_select':
      return object.properties[name].multi_select
    case 'date':
      return object.properties[name].date
    // case 'people':
    //   return object.properties[name].people.map((item) => item.name)
    case 'file':
      return object.properties[name].file.url
    case 'checkbox':
      return object.properties[name].checkbox
    case 'url':
      return object.properties[name].url
    // case 'email':
    //   return object.properties[name].email
    // case 'phone_number':
    //   return object.properties[name].phone_number
    // case 'formula':
    //   return object.properties[name].formula
    case 'relation':
      return object.properties[name].relation[0]
    case 'rollup':
      return object.properties[name].rollup
    // case 'created_time':
    //   return object.properties[name].created_time
    // case 'created_by':
    //   return object.properties[name].created_by
    // case 'last_edited_time':
    //   return object.properties[name].last_edited_time
    // case 'last_edited_by':
    //   return object.properties[name].last_edited_by

    default:
      return null
  }
}
