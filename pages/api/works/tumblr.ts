import type { Tumblr } from "libs/@type/api/tumblr"


const api_uri = process.env.NEXT_PUBLIC_api_URI
const api_Key = process.env.NEXT_PUBLIC_api_Key
const Blog_name = `${process.env.NEXT_PUBLIC_Tumblr_username}.tumblr.com`

export const endpoint = `${api_uri}${Blog_name}/posts?api_key=${api_Key}&limit=999`

export const fetcher = (url: string): Promise<Tumblr.Root> => fetch(url).then((res) => res.json())
