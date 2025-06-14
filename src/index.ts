import type {
  LoadContext,
  OptionValidationContext,
  Plugin,
} from "@docusaurus/types";
import type { Options, PluginOptions } from "./options";

import { Joi } from "@docusaurus/utils-validation";

export default function pluginUmami(
  context: LoadContext,
  options: PluginOptions
): Plugin {
  const {
    websiteID,
    analyticsDomain,
    scriptName,
    dataHostURL,
    dataAutoTrack,
    dataDoNotTrack,
    dataCache,
    dataDomains,
    dataExcludeSearch,
    dataExcludeHash,
    dataTag,
    dataBeforeSend,
  } = options;
  const isProd = process.env.NODE_ENV === "production";

  return {
    name: "docusaurus-plugin-umami",
    async contentLoaded({ actions }) {
      actions.setGlobalData(options);
    },
    injectHtmlTags() {
      if (!isProd) {
        return {};
      }

      return {
        headTags: [
          {
            tagName: "link",
            attributes: {
              rel: "preconnect",
              href: `https://${analyticsDomain}`,
            },
          },
          {
            tagName: "script",
            attributes: {
              async: true,
              defer: true,
              src: `https://${analyticsDomain}/${
                scriptName ? scriptName : "script.js"
              }`,
              "data-website-id": websiteID,
              ...(dataHostURL && { "data-host-url": dataHostURL }),
              ...(dataAutoTrack !== undefined && {
                "data-auto-track": String(dataAutoTrack),
              }),
              ...(dataDoNotTrack !== undefined && {
                "data-do-not-track": String(dataDoNotTrack),
              }),
              ...(dataCache !== undefined && {
                "data-cache": String(dataCache),
              }),
              ...(dataDomains && { "data-domains": dataDomains }),
              ...(dataExcludeSearch !== undefined && {
                "data-exclude-search": String(dataExcludeSearch),
              }),
              ...(dataExcludeHash !== undefined && {
                "data-exclude-hash": String(dataExcludeHash),
              }),
              ...(dataTag && { "data-tag": dataTag }),
              ...(dataBeforeSend && { "data-before-send": dataBeforeSend }),
            },
          },
        ],
      };
    },
  };
}

const pluginOptionsSchema = Joi.object<PluginOptions>({
  websiteID: Joi.string().required(),
  analyticsDomain: Joi.string().required(),
  scriptName: Joi.string(),
  dataHostURL: Joi.string(),
  dataAutoTrack: Joi.boolean().default(true),
  dataDoNotTrack: Joi.boolean().default(false),
  dataCache: Joi.boolean().default(false),
  dataDomains: Joi.string(),
  dataExcludeSearch: Joi.boolean().default(false),
  dataExcludeHash: Joi.boolean().default(false),
  dataTag: Joi.string(),
  dataBeforeSend: Joi.string(),
});

export function validateOptions({
  validate,
  options,
}: OptionValidationContext<Options, PluginOptions>): PluginOptions {
  return validate(pluginOptionsSchema, options);
}

export type { PluginOptions, Options };
