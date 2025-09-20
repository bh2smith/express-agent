// Dynamically determine the app URL based on environment
import { DEPLOYMENT_URL } from "vercel-url";

const getAppUrl = () => {
  return DEPLOYMENT_URL || `"localhost:${process.env.PORT || 3000}`;
};

const APP_URL = getAppUrl();

export const pluginData = {
  openapi: "3.0.0",
  info: {
    title: "Bitte Express Agent",
    description: "Express API for Bitte Agent",
    version: "1.0.1",
  },
  servers: [{ url: APP_URL }],
  "x-mb": {
    "account-id": process.env.ACCOUNT_ID ?? "max-normal.near",
    assistant: {
      name: "Express Assistant",
      description: "An assistant that uses Express JS",
      instructions: "Doesn't do much",
      tools: [],
      image: `${APP_URL}/icon.png`,
      categories: ["defi"],
      chainIds: [11155111],
    },
  },
  paths: {
    "/api/health": {
      get: {
        operationId: "health",
        summary: "Health check endpoint",
        description: "Health check endpoint",
        parameters: [],
        responses: {
          "200": { $ref: "#/components/responses/Health200" },
        },
      },
    },
  },
  components: {
    parameters: {},
    responses: {
      Health200: {
        description: "Health check endpoint",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                ok: {
                  type: "boolean",
                  example: true,
                },
                message: {
                  type: "string",
                  example: "Health check endpoint",
                },
              },
            },
          },
        },
      },
    },
    schemas: {},
  },
  "x-readme": {
    "explorer-enabled": true,
    "proxy-enabled": true,
  },
};
