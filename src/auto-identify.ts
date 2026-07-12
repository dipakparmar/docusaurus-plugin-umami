/**
 * Client module registered via `getClientModules()` only when `autoIdentify` is
 * enabled. Assigns a stable anonymous ID so Umami groups a visitor's sessions
 * together (same browser = same ID across sessions).
 *
 * @remarks
 * PRIVACY: this persists a unique identifier in `localStorage`. That is a
 * persistent identifier / personal data under GDPR + ePrivacy and generally
 * requires user consent — it negates Umami's default cookieless, consent-free
 * posture. It is opt-in and honors Do Not Track / Global Privacy Control. For
 * consent-gated identification, leave `autoIdentify` off and call `identify()`
 * from the `/client` entry after your own consent flow instead.
 */

const DEFAULT_STORAGE_KEY = 'umami.anonymous-id'

declare global {
  interface Window {
    /** Storage key injected by the plugin when `autoIdentifyStorageKey` is set. */
    __UMAMI_ANON_STORAGE_KEY__?: string
  }
}

/** Whether the visitor has signalled an opt-out via DNT or Global Privacy Control. */
function privacySignalsOptOut(): boolean {
  const nav = navigator as Navigator & { globalPrivacyControl?: boolean }
  return nav.doNotTrack === '1' || nav.globalPrivacyControl === true
}

/** Read the persisted anonymous ID, creating and storing one on first visit. */
function anonymousId(storageKey: string): string | undefined {
  try {
    let id = localStorage.getItem(storageKey)
    if (!id) {
      id = crypto.randomUUID()
      localStorage.setItem(storageKey, id)
    }
    return id
  } catch {
    // localStorage / crypto.randomUUID unavailable (private mode, old browser) — skip
    return undefined
  }
}

/** Call `umami.identify` once the deferred tracker script is available. */
function identifyWhenReady(id: string, attempts = 20): void {
  if (window.umami) {
    window.umami.identify({ id })
    return
  }
  // ponytail: poll for the deferred tracker script; give up after ~6s (20 * 300ms)
  if (attempts <= 0) return
  setTimeout(() => identifyWhenReady(id, attempts - 1), 300)
}

if (typeof window !== 'undefined' && !privacySignalsOptOut()) {
  const id = anonymousId(window.__UMAMI_ANON_STORAGE_KEY__ ?? DEFAULT_STORAGE_KEY)
  if (id) identifyWhenReady(id)
}

export {}
