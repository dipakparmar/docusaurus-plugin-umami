# 📦 docusaurus-plugin-umami

[Umami Analytics](https://umami.is) plugin for [Docusaurus](https://docusaurus.io/).

[![Version](https://img.shields.io/npm/v/@dipakparmar/docusaurus-plugin-umami.svg)](https://npmjs.org/package/@dipakparmar/docusaurus-plugin-umami)
[![Downloads/week](https://img.shields.io/npm/dw/@dipakparmar/docusaurus-plugin-umami)](https://npmjs.org/package/@dipakparmar/docusaurus-plugin-umami)
[![License](https://img.shields.io/npm/l/@dipakparmar/docusaurus-plugin-umami.svg)](https://github.com/dipakparmar/docusaurus-plugin-umami/blob/main/package.json)
[![pkg.pr.new](https://pkg.pr.new/badge/dipakparmar/docusaurus-plugin-umami)](https://pkg.pr.new/~/dipakparmar/docusaurus-plugin-umami)

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
        scriptName: "script.js", // Optional, defaults to script.js
        dataHostURL: "", // Optional
        dataAutoTrack: true, // Optional, defaults to true
        dataDoNotTrack: false, // Optional, defaults to false
        dataCache: false, // Optional, defaults to false
        dataDomains: "", // Optional, comma separated list of domains, *Recommended*
        dataExcludeSearch: false, // Optional, defaults to false
        dataExcludeHash: false, // Optional, defaults to false
        dataTag: "", // Optional
        dataBeforeSend: "beforeSendHandler", // Optional
        enableRecorder: false, // Optional, defaults to false. Loads recorder.js for session replays & heatmaps
      }),
    ],
  ],
};
```

### Options

Accepted fields:

<small>

| Name                | Type      | Default      | Description                                                                                                                                                                                                      |
| ------------------- | --------- | ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `websiteID`         | `string`  | **Required** | The unique website ID from your Umami Analytics.                                                                                                                                                                 |
| `analyticsDomain`   | `string`  | **Required** | Your domain of where Umami Analytics is hosted.                                                                                                                                                                  |
| `scriptName`        | `string`  | `script.js`  | Name of your custom tracker script.                                                                                                                                                                              |
| `dataHostURL`       | `string`  |              | By default, Umami will send data to wherever the script is located. You can override this to send data to another location.                                                                                      |
| `dataAutoTrack`     | `boolean` | `true`       | By default, Umami tracks all pageviews and events for you automatically. You can disable this behavior and track events yourself using the tracker functions.                                                    |
| `dataDoNotTrack`    | `boolean` | `false`      | Configure Umami to respect the visitor's Do Not Track setting.                                                                                                                                                   |
| `dataCache`         | `boolean` | `false`      | If you get a lot of pageviews from the same user, for example in a forum website, you can cache some data to improve the performance of the tracking script.                                                     |
| `dataDomains`       | `string`  |              | If you want the tracker to only run on specific domains, you can add them to your tracker script. This is a comma delimited list of domain names. Helps if you are working in a staging/development environment. |
| `dataExcludeSearch` | `boolean` | `false`      | Configure the tracker to not record query parameters in the URL.                                                                                                                                                 |
| `dataExcludeHash`   | `boolean` | `false`      | Configure the tracker to not record URL hashes.                                                                                                                                                                  |
| `dataTag`           | `string`  |              | Add a [tag](https://docs.umami.is/docs/tags) to your website's data for segmentation (e.g. A/B testing).                                                                                                          |
| `dataBeforeSend`    | `string`  |              | Define a function that will be called before sending the data. Useful for modifying the data before it's sent to the server.                                                                                     |
| `enableRecorder`    | `boolean` | `false`      | Load Umami's `recorder.js` script to enable [session replays](https://docs.umami.is/docs/replays) and [heatmaps](https://docs.umami.is/docs/heatmaps). Which of the two is recorded is toggled per-website in the Umami dashboard.                     |
| `autoIdentify`      | `boolean` | `false`      | Assign a stable anonymous ID (persisted in `localStorage`) so a visitor's sessions are grouped via [distinct IDs](https://docs.umami.is/docs/distinct-ids). **See the privacy note below.** Honors Do Not Track / Global Privacy Control.               |
| `autoIdentifyStorageKey` | `string` | `umami.anonymous-id` | `localStorage` key used to persist the `autoIdentify` anonymous ID.                                                                                                                                     |

</small>

## Custom event tracking

Once the tracker is loaded you can record [custom events](https://docs.umami.is/docs/track-events) two ways.

### Data attributes (no JS)

Add `data-umami-event` (and optional `data-umami-event-*`) to any element:

```jsx
<button data-umami-event="Signup" data-umami-event-plan="pro">
  Sign up
</button>
```

### Typed client helpers

Import from the `/client` entry for a safe, typed API. The helpers no-op during SSR and before the deferred tracker script has loaded, so they are safe to call anywhere:

```tsx
import {
  track,
  identify,
  useUmami,
} from "@dipakparmar/docusaurus-plugin-umami/client";

// Fire a custom event
track("Signup", { plan: "pro" });

// Assign a distinct id to the session — https://docs.umami.is/docs/distinct-ids
identify({ id: "user@example.com" });

// Inside a React component
function SignupButton() {
  const { track } = useUmami();
  return <button onClick={() => track("Signup", { plan: "pro" })}>Sign up</button>;
}
```

Both approaches work inside `.mdx` docs — `data-umami-event` attributes pass through, and you can `import` the helpers at the top of the file. Because the helpers no-op during server-side rendering, they are safe to call while Docusaurus prerenders your pages (`useUmami()` is a hook, so call it at the top of the MDX doc or inside a component, not conditionally).

> **Tags** are set via the `dataTag` option (the `data-tag` script attribute), not the tracking API — see [Umami tags](https://docs.umami.is/docs/tags).

## Anonymous session grouping (`autoIdentify`)

Set `autoIdentify: true` to have the plugin generate a random ID on the first visit, persist it in `localStorage`, and `identify()` it on every load — so a visitor's sessions are grouped together (same browser = same ID). It's opt-in and honors Do Not Track / Global Privacy Control.

> ⚠️ **Privacy.** A persistent identifier is personal data under GDPR / ePrivacy and generally **requires user consent** — enabling this negates Umami's default cookieless, consent-free posture. Using `localStorage` instead of a cookie does **not** change this; the legal treatment is the same. You are responsible for obtaining consent where required.
>
> For a consent-gated approach, leave `autoIdentify` off and call `identify()` from the `/client` entry yourself, after your own consent flow.

## Reference:

- Docusuarus Plugin Readme Example from https://github.com/sgromkov/docusaurus-plugin-yandex-metrica
- Plugin Architecture: https://docusaurus.io/docs/api/plugin-methods#example
- Umami Analytics Tracker Configuration: https://umami.is/docs/tracker-configuration
