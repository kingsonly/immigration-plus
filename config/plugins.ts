export default ({ env }) => ({
  documentation: {
    enabled: true,
    config: {
      info: {
        title: "Immigration Plus API",
        description: "API reference for Coming2Canada services",
        version: "1.0.0",
      },
      servers: [
        {
          url: env("DOCS_BASE_URL", env("PUBLIC_URL", "http://localhost:1337")),
          description: "Primary API server",
        },
      ],
      externalDocs: {
        description: "More details about Coming2Canada",
        url: env("DOCS_EXTERNAL_URL", "https://cms.coming2canada.ca"),
      },
    },
  },
});
