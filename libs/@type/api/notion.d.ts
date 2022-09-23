import type { Client } from '@notionhq/client';

export type PageObject = ElementType<
  Awaited<ReturnType<Client['databases']['query']>>['results']
>;

export type BlockObject = ElementType<
  Awaited<ReturnType<Client['blocks']['children']['list']>>['results']
>;
