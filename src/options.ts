/** Configuration for the Umami Analytics Docusaurus plugin. */
export type PluginOptions = {
  /** The unique website ID from your Umami Analytics. */
  websiteID: string
  /** The domain where your Umami instance is hosted (without protocol). */
  analyticsDomain: string
  /**
   * Name of your custom tracker script.
   * @defaultValue `'script.js'`
   */
  scriptName?: string
  /** Send collected data to a location other than where the script is hosted. */
  dataHostURL?: string
  /**
   * Automatically track pageviews and events. Disable to track manually with the
   * {@link https://docs.umami.is/docs/tracker-functions | tracker functions}.
   * @defaultValue `true`
   */
  dataAutoTrack?: boolean
  /**
   * Respect the visitor's Do Not Track setting.
   * @defaultValue `false`
   */
  dataDoNotTrack?: boolean
  /**
   * Cache some data to improve performance for repeat pageviews.
   * @defaultValue `false`
   */
  dataCache?: boolean
  /** Only run the tracker on these domains (comma-separated list). */
  dataDomains?: string
  /**
   * Do not record URL query parameters.
   * @defaultValue `false`
   */
  dataExcludeSearch?: boolean
  /**
   * Do not record URL hashes.
   * @defaultValue `false`
   */
  dataExcludeHash?: boolean
  /**
   * Add a {@link https://docs.umami.is/docs/tags | tag} to your data for
   * segmentation (e.g. A/B testing).
   */
  dataTag?: string
  /** Name of a global function called before data is sent, for modifying it. */
  dataBeforeSend?: string
  /**
   * Load Umami's `recorder.js` script to enable
   * {@link https://docs.umami.is/docs/replays | session replays} and
   * {@link https://docs.umami.is/docs/heatmaps | heatmaps}. Which of the two is
   * recorded is toggled per-website in the Umami dashboard.
   * @defaultValue `false`
   */
  enableRecorder?: boolean
  /**
   * Assign a stable anonymous ID (persisted in `localStorage`) so a visitor's
   * sessions are grouped together via {@link https://docs.umami.is/docs/distinct-ids | distinct IDs}.
   *
   * @remarks
   * PRIVACY: a persistent identifier is personal data under GDPR/ePrivacy and
   * generally requires consent — it negates Umami's default cookieless posture.
   * Honors Do Not Track / Global Privacy Control. For consent-gated tracking,
   * leave this off and call `identify()` from the `/client` entry yourself.
   * @defaultValue `false`
   */
  autoIdentify?: boolean
  /**
   * `localStorage` key used to persist the {@link autoIdentify} anonymous ID.
   * @defaultValue `'umami.anonymous-id'`
   */
  autoIdentifyStorageKey?: string
}

/** All plugin options, with everything optional (for consumer-facing typing). */
export type Options = Partial<PluginOptions>
