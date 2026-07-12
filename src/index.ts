import type { LoadContext, OptionValidationContext, Plugin } from '@docusaurus/types'
import type { Options, PluginOptions } from './options'

import { Joi } from '@docusaurus/utils-validation'

/**
 * Umami Analytics plugin for Docusaurus. Injects the tracker script (production
 * only) and, optionally, the recorder and anonymous auto-identify modules.
 *
 * @param context - Docusaurus load context (unused).
 * @param options - {@link PluginOptions} for the tracker.
 */
export default function pluginUmami(context: LoadContext, options: PluginOptions): Plugin {
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
    enableRecorder,
    autoIdentify,
    autoIdentifyStorageKey,
  } = options
  const isProd = process.env.NODE_ENV === 'production'

  return {
    name: 'docusaurus-plugin-umami',
    getClientModules() {
      // Load the auto-identify client module only when opted in, and only in
      // production (the tracker itself is production-only).
      return isProd && autoIdentify ? [require.resolve('./auto-identify')] : []
    },
    async contentLoaded({ actions }) {
      actions.setGlobalData(options)
    },
    injectHtmlTags() {
      if (!isProd) {
        return {}
      }

      return {
        headTags: [
          {
            tagName: 'link',
            attributes: {
              rel: 'preconnect',
              href: `https://${analyticsDomain}`,
            },
          },
          {
            tagName: 'script',
            attributes: {
              async: true,
              defer: true,
              src: `https://${analyticsDomain}/${scriptName ? scriptName : 'script.js'}`,
              'data-website-id': websiteID,
              ...(dataHostURL && { 'data-host-url': dataHostURL }),
              ...(dataAutoTrack !== undefined && {
                'data-auto-track': String(dataAutoTrack),
              }),
              ...(dataDoNotTrack !== undefined && {
                'data-do-not-track': String(dataDoNotTrack),
              }),
              ...(dataCache !== undefined && {
                'data-cache': String(dataCache),
              }),
              ...(dataDomains && { 'data-domains': dataDomains }),
              ...(dataExcludeSearch !== undefined && {
                'data-exclude-search': String(dataExcludeSearch),
              }),
              ...(dataExcludeHash !== undefined && {
                'data-exclude-hash': String(dataExcludeHash),
              }),
              ...(dataTag && { 'data-tag': dataTag }),
              ...(dataBeforeSend && { 'data-before-send': dataBeforeSend }),
            },
          },
          // Recorder script powers session replays and heatmaps (toggled per
          // feature in the Umami dashboard).
          ...(enableRecorder
            ? [
                {
                  tagName: 'script',
                  attributes: {
                    defer: true,
                    src: `https://${analyticsDomain}/recorder.js`,
                    'data-website-id': websiteID,
                  },
                },
              ]
            : []),
          // Pass a custom storage key to the auto-identify client module via an
          // inline global (client modules can't receive plugin options directly).
          ...(autoIdentify && autoIdentifyStorageKey
            ? [
                {
                  tagName: 'script',
                  innerHTML: `window.__UMAMI_ANON_STORAGE_KEY__=${JSON.stringify(autoIdentifyStorageKey)}`,
                },
              ]
            : []),
        ],
      }
    },
  }
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
  enableRecorder: Joi.boolean().default(false),
  autoIdentify: Joi.boolean().default(false),
  autoIdentifyStorageKey: Joi.string().default('umami.anonymous-id'),
})

/** Validate and apply defaults to user-provided plugin options. */
export function validateOptions({
  validate,
  options,
}: OptionValidationContext<Options, PluginOptions>): PluginOptions {
  return validate(pluginOptionsSchema, options)
}

export type { PluginOptions, Options }
