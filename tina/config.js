import { defineConfig } from "tinacms";

const branch = process.env.HEAD || process.env.VERCEL_GIT_COMMIT_REF || "main";

export default defineConfig({
  branch,
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  token: process.env.TINA_TOKEN,

  build: {
    outputFolder: "admin",
    publicFolder: "./",
  },
  media: {
    tina: {
      mediaRoot: "assets",
      publicFolder: "./",
    },
  },
  schema: {
    collections: [
      {
        name: "bio",
        label: "Bio & Introduction",
        path: "content",
        format: "json",
        match: {
          include: "bio",
        },
        ui: {
          allowedActions: {
            create: false,
            delete: false,
          },
        },
        fields: [
          {
            type: "string",
            name: "subtitle",
            label: "Hero Subtitle",
          },
          {
            type: "string",
            name: "headline",
            label: "Hero Headline",
          },
          {
            type: "string",
            name: "bioParagraph1",
            label: "Bio Paragraph 1",
            ui: {
              component: "textarea",
            },
          },
          {
            type: "string",
            name: "bioParagraph2",
            label: "Bio Paragraph 2",
            ui: {
              component: "textarea",
            },
          },
        ],
      },
      {
        name: "events",
        label: "Speaking & Events",
        path: "content",
        format: "json",
        match: {
          include: "events",
        },
        fields: [
          {
            type: "string",
            name: "category",
            label: "Category / Event Name",
          },
          {
            type: "string",
            name: "title",
            label: "Event Title",
          },
          {
            type: "string",
            name: "description",
            label: "Description",
            ui: {
              component: "textarea",
            },
          },
        ],
      },
      {
        name: "publications",
        label: "Publications",
        path: "content",
        format: "json",
        match: {
          include: "publications",
        },
        fields: [
          {
            type: "string",
            name: "type",
            label: "Publication Type",
          },
          {
            type: "string",
            name: "title",
            label: "Title",
          },
          {
            type: "string",
            name: "description",
            label: "Description",
            ui: {
              component: "textarea",
            },
          },
          {
            type: "string",
            name: "link",
            label: "Link URL",
          },
        ],
      },
    ],
  },
});
