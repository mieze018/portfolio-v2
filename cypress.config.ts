import { defineConfig } from 'cypress'

export default defineConfig({
  projectId: 'p3ih1o',
  e2e: {
    baseUrl: 'http://localhost:3000/',
    defaultCommandTimeout: 10000,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
})
