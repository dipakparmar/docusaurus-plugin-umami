import { Joi } from "@docusaurus/utils-validation";
import type {
  LoadContext,
  Plugin,
  OptionValidationContext,
} from "@docusaurus/types";
import type { PluginOptions, Options } from "./options";

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
              ...(dataAutoTrack && { "data-auto-track": dataAutoTrack }),
              ...(dataDoNotTrack && { "data-do-not-track": dataDoNotTrack }),
              ...(dataCache && { "data-cache": dataCache }),
              ...(dataDomains && { "data-domains": dataDomains }),
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
});

export function validateOptions({
  validate,
  options,
}: OptionValidationContext<Options, PluginOptions>): PluginOptions {
  return validate(pluginOptionsSchema, options);
}

export type { PluginOptions, Options };
