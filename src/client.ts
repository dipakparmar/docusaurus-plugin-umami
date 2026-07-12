/**
 * Browser-side helpers for Umami custom event tracking, distinct IDs, and
 * session data.
 *
 * @remarks
 * These helpers are safe to call during SSR or before the deferred tracker
 * script has loaded — they no-op until `window.umami` exists, so they work in
 * `.mdx` docs and React components alike.
 *
 * Tags are intentionally not covered here: Umami only supports tags via the
 * `data-tag` script attribute (the plugin's `dataTag` option), not the
 * `track()` API. See {@link https://docs.umami.is/docs/tags}.
 *
 * @packageDocumentation
 */

/** Arbitrary event or session data payload. */
export type UmamiData = Record<string, unknown>

/** The `window.umami` tracker object exposed by the Umami script. */
export interface Umami {
  /** Track the current page. */
  track(): void
  /** Track a custom event by name. */
  track(eventName: string): void
  /** Track a custom event with attached data. */
  track(eventName: string, eventData: UmamiData): void
  /** Track with a fully custom payload. */
  track(payload: UmamiData): void
  /** Track with a callback that receives and returns the payload. */
  track(callback: (props: UmamiData) => UmamiData): void
  /** Assign a distinct ID to the session. */
  identify(uniqueId: string): void
  /** Assign a distinct ID with attached session data. */
  identify(uniqueId: string, sessionData: UmamiData): void
  /** Attach session data (which may include an `id`) without a positional ID. */
  identify(sessionData: UmamiData): void
}

declare global {
  interface Window {
    /** The Umami tracker, present once the tracker script has loaded. */
    umami?: Umami
  }
}

function tracker(): Umami | undefined {
  return typeof window === 'undefined' ? undefined : window.umami
}

/**
 * Record a custom event. No-ops safely during SSR and before the tracker loads.
 *
 * @example
 * ```ts
 * track('Signup', { plan: 'pro' })
 * ```
 */
export function track(): void
export function track(eventName: string): void
export function track(eventName: string, eventData: UmamiData): void
export function track(payload: UmamiData): void
export function track(callback: (props: UmamiData) => UmamiData): void
export function track(...args: unknown[]): void {
  const umami = tracker()
  if (!umami) return
  const fn = umami.track as (...a: unknown[]) => void
  fn(...args)
}

/**
 * Assign a {@link https://docs.umami.is/docs/distinct-ids | distinct ID} to the
 * session. No-ops safely during SSR and before the tracker loads.
 *
 * @example
 * ```ts
 * identify({ id: 'user@example.com' })
 * ```
 */
export function identify(uniqueId: string): void
export function identify(uniqueId: string, sessionData: UmamiData): void
export function identify(sessionData: UmamiData): void
export function identify(...args: unknown[]): void {
  const umami = tracker()
  if (!umami) return
  const fn = umami.identify as (...a: unknown[]) => void
  fn(...args)
}

/**
 * React hook returning the {@link track} and {@link identify} helpers, for use
 * inside components.
 *
 * @remarks
 * ponytail: not a React hook under the hood — `track`/`identify` are stable
 * module functions, so `useMemo`/React would add a peer dependency for zero
 * benefit.
 *
 * @example
 * ```tsx
 * const { track } = useUmami()
 * <button onClick={() => track('Signup')}>Sign up</button>
 * ```
 */
export function useUmami(): { track: typeof track; identify: typeof identify } {
  return { track, identify }
}
