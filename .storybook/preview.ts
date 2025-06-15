import type { Preview } from '@storybook/nextjs'
import '../styles/global.css'
import { MINIMAL_VIEWPORTS } from 'storybook/viewport'
const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    locale: 'ja',
    locales: {
      en: 'English',
      ja: '日本語',
    },
    viewport: {
      options: MINIMAL_VIEWPORTS,
    },
  },
}

export default preview
