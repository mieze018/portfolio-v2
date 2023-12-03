import { expect } from '@storybook/jest'
import { userEvent, waitFor, within } from '@storybook/testing-library'
import type { Meta, StoryObj } from '@storybook/react'
import { Post } from './Post'
import { Default as Photo } from 'components/Molecules/Post/Photo.stories'
import { Tumblr } from 'libs/@type/api/tumblr'

const meta: Meta<typeof Post> = { component: Post }
export default meta
type Story = StoryObj<typeof Post>

export const Default: Story = {
  args: {
    post: {
      type: 'photo',
      blog_name: 'blog_name',
      blog: {
        name: 'blog_name',
        title: 'blog_title',
        description: 'blog_description',
        url: 'blog_url',
        uuid: 'blog_uuid',
        updated: 20231204,
      },
      id: 123456789,
      id_string: 'id_string',
      post_url: 'post_url',
      slug: 'post_slug',
      date: '2021-01-01 00:00:00 GMT',
      timestamp: 1234567890,
      state: 'published',
      format: 'html',
      reblog_key: 'reblog_key',
      tags: ['tag1', 'tag2'],
      short_url: 'short_url',
      summary: 'summary',
      should_open_in_legacy: false,
      recommended_source: null,
      recommended_color: null,
      note_count: 0,
      caption: 'caption',
      reblog: {
        comment: 'comment',
        tree_html: 'tree_html',
      },
      trail: [],
      image_permalink: 'image_permalink',
      photos: [Photo.args?.photo as Tumblr.Photo],
      can_like: false,
      interactability_reblog: 'reblog',
      can_reblog: false,
      can_send_in_message: true,
      can_reply: false,
      display_avatar: true,
    },
  },
}
export const Column: Story = {
  ...Default,
  args: {
    post: {
      ...(Default.args?.post as Tumblr.Post),
      photos: [
        Photo.args?.photo as Tumblr.Photo,
        Photo.args?.photo as Tumblr.Photo,
        Photo.args?.photo as Tumblr.Photo,
        Photo.args?.photo as Tumblr.Photo,
      ],
      photoset_layout: 'photoset_layout',
    },
  },
}
export const Row: Story = {
  ...Default,
  args: {
    post: {
      ...(Default.args?.post as Tumblr.Post),
      photos: [Photo.args?.photo as Tumblr.Photo, Photo.args?.photo as Tumblr.Photo],
      photoset_layout: 'photoset_layout',
    },
  },
}
export const ShowOnlyLastPhoto: Story = {
  ...Default,
  args: {
    post: {
      ...(Column.args?.post as Tumblr.Post),
      tags: ['s-o-l-p'],
    },
  },
}
