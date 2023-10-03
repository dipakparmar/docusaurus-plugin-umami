# 📦 docusaurus-plugin-umami

[Umami Analytics](https://umami.is) plugin for [Docusaurus v2](https://docusaurus.io/).

[![Version](https://img.shields.io/npm/v/@dipakparmar/docusaurus-plugin-umami.svg)](https://npmjs.org/package/@dipakparmar/docusaurus-plugin-umami)
[![Downloads/week](https://img.shields.io/npm/dw/@dipakparmar/docusaurus-plugin-umami)](https://npmjs.org/package/@dipakparmar/docusaurus-plugin-umami)
[![License](https://img.shields.io/npm/l/@dipakparmar/docusaurus-plugin-umami.svg)](https://github.com/dipakparmar/docusaurus-plugin-umami/blob/main/package.json)

### ⚠️ production only

This plugin is always inactive in development and only active in production to avoid polluting the analytics statistics.

## Installation

Install the plugin with npm:

```bash
npm install --save @dipakparmar/docusaurus-plugin-umami
```

or with yarn:

```bash
yarn add @dipakparmar/docusaurus-plugin-umami
```

or with pnpm:

```bash
pnpm install @dipakparmar/docusaurus-plugin-umami
```

or with bun:
  
```bash
bun install @dipakparmar/docusaurus-plugin-umami
```

## Configuration

Add the plugin and websiteID and analyticsDomain to your `docusaurus.config.js`:

```js
module.exports = {
  plugins: [
    [
      "@dipakparmar/docusaurus-plugin-umami",
      /** @type {import('@dipakparmar/docusaurus-plugin-umami').Options} */
      ({
        websiteID: "your-website-id", // Required
        analyticsDomain: "analytics.mydomain.com", // Required
        scriptName: "", // Optional
        dataHostURL: "", // Optional
        dataAutoTrack: true, // Optional
        dataDoNoTrack: true, // Optional
        dataCache: true, // Optional
        dataDomains: "", // comma separated list of domains, *Recommended*
      }),
    ],
  ],
};
```

### Options

Accepted fields:

<small>

| Name              | Type      | Default      | Description                                                                                                                                                                                                      |
| ----------------- | --------- | ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `websiteID`       | `string`  | **Required** | The unique website ID from your Umami Analytics.                                                                                                                                                                 |
| `analyticsDomain` | `string`  | **Required** | Your domain of where Umami Analytics is hosted.                                                                                                                                                                  |
| `scriptName`      | `string`  | `script.js`   | Name of your custom tracker script.                                                                                                                                                                              |
| `dataHostURL`     | `string`  |              | By default, Umami will send data to wherever the script is located. You can override this to send data to another location.                                                                                      |
| `dataAutoTrack`   | `boolean` |              | By default, Umami tracks all pageviews and events for you automatically. You can disable this behavior and track events yourself using the tracker functions.                                                    |
| `dataDoNoTrack`   | `boolean` |              | Configure Umami to respect the visitor's Do Not Track setting.                                                                                                                                                   |
| `dataCache`       | `boolean` |              | If you get a lot of pageviews from the same user, for example in a forum website, you can cache some data to improve the performance of the tracking script.                                                     |
| `dataDomains`     | `string`  |              | If you want the tracker to only run on specific domains, you can add them to your tracker script. This is a comma delimited list of domain names. Helps if you are working in a staging/development environment. |

</small>

## Reference:

- Docusuarus Plugin Readme Example from https://github.com/sgromkov/docusaurus-plugin-yandex-metrica
- Plugin Architecture: https://docusaurus.io/docs/api/plugin-methods#example
- Umami Analytics Tracker Configuration: https://umami.is/docs/tracker-config
