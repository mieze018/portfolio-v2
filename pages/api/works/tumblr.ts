import type { Tumblr } from "libs/@type/api/tumblr"


const api_uri = 'https://api.tumblr.com/v2/blog/'
const api_Key = process.env.NEXT_PUBLIC_api_Key
const Blog_name = `mieze018.tumblr.com`

export const endpoint = `${api_uri}${Blog_name}/posts?api_key=${api_Key}&limit=999`

export const fetcher = (url: string): Promise<Tumblr.Root> => fetch(url).then((res) => res.json())
