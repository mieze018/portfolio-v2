import type { Preview } from '@storybook/react-vite'
import { createElement } from 'react'
import { PathContext } from '../libs/usePathname'
import '../styles/global.css'
import { MINIMAL_VIEWPORTS } from 'storybook/viewport'

const preview: Preview = {
  beforeEach: (context) => {
    const hash = context.parameters.location?.hash || ''
    window.history.replaceState(
      window.history.state,
      '',
      window.location.pathname + window.location.search + hash
    )
    window.dispatchEvent(new HashChangeEvent('hashchange'))
  },
  decorators: [
    (Story, context) =>
      createElement(
        PathContext.Provider,
        { value: context.parameters.location?.pathname || '/' },
        createElement(Story)
      ),
  ],
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

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo',
    },
  },
}

export default preview
