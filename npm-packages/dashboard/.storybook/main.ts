import { StorybookConfig } from "@storybook/nextjs";
import path from "path";

const config: StorybookConfig = {
  stories: [
    "../src/**/*.stories.@(js|jsx|ts|tsx)",
    "../../dashboard-common/src/**/*.stories.@(js|jsx|ts|tsx)",
    "../../@convex-dev/design-system/src/**/*.stories.@(js|jsx|ts|tsx)",
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-themes",
    {
      name: "@storybook/addon-styling-webpack",
      options: {
        postCss: true,
      },
    },
    "@storybook/addon-docs",
  ],
  framework: {
    name: "@storybook/nextjs",
    options: {
      webpackFinal: async (config) => {
        // Configure aliases
        config.resolve = {
          ...config.resolve,
          alias: {
            ...config.resolve?.alias,
            "@common": path.resolve(__dirname, "../../dashboard-common/src"),
            "@ui": path.resolve(
              __dirname,
              "../../@convex-dev/design-system/src",
            ),
          },
        };

        return config;
      },
    },
  },
};

export default config;
