// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrl: 'http://10.5.10.14:8000/api',
  // apiUrl: 'https://home-api.bigmike.dev/api',
  // The `backend-public` compose service. Host IP rather than localhost, since the
  // browser runs on a workstation rather than on this VM.
  publicApiUrl: 'http://10.5.10.14:8001/api',
  // moneyAppApiUrl: 'http://localhost:8001/api',
  moneyAppApiUrl: 'https://money-api.bigmike.dev/api',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
