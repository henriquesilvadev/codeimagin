const { defineConfig } = require('cypress')

module.exports = defineConfig({
    projectId: 'codeimagin',
    e2e: {
        baseUrl: 'http://localhost:8080',
        video: true,
        videosFolder: 'cypress/videos',
        screenshotsFolder: 'cypress/screenshots',
        viewportWidth: 1280,
        viewportHeight: 720,
        setupNodeEvents(on, config) {
            // implement node event listeners here
        },
    },
})
