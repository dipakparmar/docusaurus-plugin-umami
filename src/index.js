module.exports = async function pluginUmami(context, options) {
  const { websiteID, analyticsDomain, scriptName, dataHostURL, dataAutoTrack, dataDoNotTrack, dataCache, dataDomains } = options;
  const isProd = process.env.NODE_ENV === "production";

  if (!websiteID) {
    throw new Error(
      'You need to specify `websiteID` field in `options` '
      + 'to use @dipakparmar/docusaurus-plugin-umami'
    )
  }
  if (!analyticsDomain) {
    throw new Error(
      'You need to specify `analyticsDomain` field in `options` '
      + 'to use @dipakparmar/docusaurus-plugin-umami'
    )
  }

  return {
    name: 'docusaurus-plugin-umami',
    async contentLoaded({ actions }) {
      actions.setGlobalData(options);
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
