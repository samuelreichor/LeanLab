/**
 * Zugriff auf das c15t Consent-Management.
 * Nur clientseitig verfügbar (siehe app/plugins/consent.client.ts) – auf dem Server `undefined`.
 */
export function useConsent() {
  const { $consent } = useNuxtApp()
  return $consent as typeof $consent | undefined
}
