import { Client } from "@notionhq/client";

import type { PageObject, propertiesTypes } from "libs/@type/api/notion";

const notion = new Client({ auth: process.env.NEXT_PUBLIC_NOTION_TOKEN })

export const getDatabase = async (databaseId: string) => {
  const response = await notion.databases.query({
    database_id: databaseId,
  });
  return response.results;
};

export const getPage = async (pageId: string) => {
  const response = await notion.pages.retrieve({ page_id: pageId });
  return response;
};

export const getBlocks = async (blockId: string) => {
  const blocks = [];
  let cursor;
  while (true) {
    const { results, next_cursor } = await notion.blocks.children.list({
      start_cursor: cursor,
      block_id: blockId,
    });
    blocks.push(...results);
    if (!next_cursor) {
      break;
    }
    cursor = next_cursor;
  }
  return blocks;
};

export const getProperties = (object: PageObject, { name, type }: { name: string, type: propertiesTypes }) => {
  switch (type) {
    case 'select':
      return object.properties[name].select.name
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
      return object.properties[name].relation
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
