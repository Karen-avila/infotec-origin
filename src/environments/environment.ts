// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  passwordShaded: false,
  apis_url : 'https://apis-pre.bancodelbienestar.com.mx',
  mifos_url : 'https://backoffice-pre.bancodelbienestar.com.mx',
  reCaptchaKey: "6LdQErYZAAAAACb2f4AgheH_SFBH131W8QCKvnvA",
  gravitee_api_keys : {},
  headers_mifos : {
    'Fineract-Platform-TenantId': 'default',
    'Content-Type': 'application/json', 'Content-Encoding': 'Gzip'
  },
  headers_apis : {
    'X-Gravitee-Api-Key': '6c7180e6-4855-413a-ba3d-0f8c75b97490',
    'Content-Type': 'application/json'
  },
  provisional_header:{
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Content-Encoding': 'gzip',
      'Fineract-Platform-TenantId': 'default',
      'Authorization': 'Basic aW5mb3RlYzpwYXNzd29yZA=='
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
