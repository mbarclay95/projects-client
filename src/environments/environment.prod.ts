export const environment = {
  production: true,
  apiUrl: 'https://home-api.bigmike.dev/api',
  // Still the old hostname deliberately. It has to keep resolving to the same
  // container regardless, because event signup links already sent to people
  // contain it and have no expiry. Switch to the new hostname once its DNS and
  // proxy host exist; this is a one-line change and nothing breaks in the meantime.
  publicApiUrl: 'https://event-signup-api.bigmike.dev/api',
  moneyAppApiUrl: 'https://money-api.bigmike.dev/api',
};
