export namespace Tumblr {
  export interface Root {
    meta: Meta
    response: Response
  }

  export interface Meta {
    status: number
    msg: string
  }

  export interface Response {
    blog: Blog
    posts: Post[]
    total_posts: number
  }

  export interface Blog {
    ask: boolean
    ask_anon: boolean
    ask_page_title: string
    asks_allow_media: boolean
    avatar: Avatar[]
    can_chat: boolean
    can_subscribe: boolean
    description: string
    is_nsfw: boolean
    likes: number
    name: string
    posts: number
    share_likes: boolean
    subscribed: boolean
    theme: Theme
    title: string
    total_posts: number
    updated: number
    url: string
    uuid: string
  }

  export interface Avatar {
    width: number
    height: number
    url: string
  }

  export interface Theme {
    header_full_width: number
    header_full_height: number
    header_focus_width: number
    header_focus_height: number
    avatar_shape: string
    background_color: string
    body_font: string
    header_bounds: string
    header_image: string
    header_image_focused: string
    header_image_poster: string
    header_image_scaled: string
    header_stretch: boolean
    link_color: string
    show_avatar: boolean
    show_description: boolean
    show_header_image: boolean
    show_title: boolean
    title_color: string
    title_font: string
    title_font_weight: string
  }

  interface Post {
    type: string
    blog_name: string
    blog: Blog2
    id: number
    id_string: string
    post_url: string
    slug: string
    date: string
    timestamp: number
    state: string
    format: string
    reblog_key: string
    tags: string[]
    short_url: string
    summary: string
    should_open_in_legacy: boolean
    recommended_source: any
    recommended_color: any
    note_count: number
    caption: string
    reblog: Reblog
    trail: Trail[]
    image_permalink?: string
    photos: Photo[]
    can_like: boolean
    interactability_reblog: string
    can_reblog: boolean
    can_send_in_message: boolean
    can_reply: boolean
    display_avatar: boolean
    photoset_layout?: string
    bookmarklet?: boolean
    link_url?: string
  }

  export interface Blog2 {
    name: string
    title: string
    description: string
    url: string
    uuid: string
    updated: number
  }

  export interface Reblog {
    comment: string
    tree_html: string
  }

  export interface Trail {
    blog: Blog3
    post: Post2
    content_raw: string
    content: string
    is_current_item?: boolean
    is_root_item?: boolean
  }

  export interface Blog3 {
    name: string
    active: boolean
    theme: Theme2
    share_likes: boolean
    share_following: boolean
    can_be_followed: boolean
  }

  export interface Theme2 {
    header_full_width?: number
    header_full_height?: number
    header_focus_width?: number
    header_focus_height?: number
    avatar_shape: string
    background_color: string
    body_font: string
    header_bounds: any
    header_image: string
    header_image_focused: string
    header_image_poster: string
    header_image_scaled: string
    header_stretch: boolean
    link_color: string
    show_avatar: boolean
    show_description: boolean
    show_header_image: boolean
    show_title: boolean
    title_color: string
    title_font: string
    title_font_weight: string
  }

  export interface Post2 {
    id: string
  }

  export interface Photo {
    caption: string
    original_size: OriginalSize
    alt_sizes: AltSize[]
  }

  export interface OriginalSize {
    url: string
    width: number
    height: number
  }

  export interface AltSize {
    url: string
    width: 1280 | 500 | 250 | 100 | 50
    height: number
  }
}
