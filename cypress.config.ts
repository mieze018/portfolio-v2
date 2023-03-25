import { defineConfig } from 'cypress'

export default defineConfig({
  projectId: 'p3ih1o',

  e2e: {
    baseUrl: 'http://localhost:3009',
    defaultCommandTimeout: 10000,
    //実行前にサーバを起動する

    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },

  component: {
    devServer: {
      framework: 'next',
      bundler: 'webpack',
    },
  },
})
