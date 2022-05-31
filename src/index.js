module.exports = async function pluginUmami(context, options) {
  const { websiteID, analyticsDomain, scriptName, dataHostURL, dataAutoTrack, dataDoNotTrack, dataCache, dataDomains } = options;
  const isProd = process.env.NODE_ENV === "production";

  if (!websiteID) {
    throw new Error(
      'You need to specify `websiteID` field in `options` '
      + 'to use docusaurus-plugin-umami'
    )
  }
  if (!analyticsDomain) {
    throw new Error(
      'You need to specify `analyticsDomain` field in `options` '
      + 'to use docusaurus-plugin-umami'
    )
  }

  return {
    name: 'docusaurus-plugin-umami',
    async contentLoaded({ actions }) {
      actions.setGlobalData(options);
    },
    getClientModules() {
      // only load the module in production and when the dataAutoTrack is set to false to prevent duplicate event tracking
      return isProd && dataAutoTrack == false ? ['./analytics'] : [];
    },
    injectHtmlTags() {
      if (!isProd) {
        return {};
      }

      return {
        headTags: [{
          tagName: "link",
          attributes: {
            rel: "preconnect",
            href: `https://${analyticsDomain}`,
          },
        },
        {
          tagName: 'script',
          attributes: {
            async: true,
            defer: true,
            src: `https://${analyticsDomain}/${scriptName ? scriptName : 'umami.js'}`,
            "data-website-id": websiteID,
            ...(dataHostURL && { "data-host-url": dataHostURL }),
            ...(dataAutoTrack && { "data-auto-track": dataAutoTrack }),
            ...(dataDoNotTrack && { "data-do-not-track": dataDoNotTrack }),
            ...(dataCache && { "data-cache": dataCache }),
            ...(dataDomains && { "data-domains": dataDomains }),
          },
        },
        ]
      }
    }
  }
}
