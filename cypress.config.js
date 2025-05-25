const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'sinn8s',
  e2e: {
    baseUrl: "https://www.wikipedia.org/",
  },
});
