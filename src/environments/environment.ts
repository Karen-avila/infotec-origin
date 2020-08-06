// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: true,
  passwordShaded: false,
  apis_url : 'https://apis-pre.bancodelbienestar.com.mx',
  mifos_url : 'https://backoffice-pre.bancodelbienestar.com.mx',
  reCaptchaKey: "6LdQErYZAAAAACb2f4AgheH_SFBH131W8QCKvnvA",
  gravitee_api_keys : {
    'registro': '6c7180e6-4855-413a-ba3d-0f8c75b97490',
    'fineract': '9e2a3bba-a89f-405d-a56d-236d9671a99d',
    'curp': 'e0d2074e-ab85-4ada-b48f-ee23a766d4bd'
  },
  headers_mifos : {
    'Fineract-Platform-TenantId': 'default',
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Content-Encoding': 'gzip'
  },
  headers_apis : {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Content-Encoding': 'gzip'
  },
  provisional_header:{
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Content-Encoding': 'gzip',
    'Fineract-Platform-TenantId': 'default',
    'Authorization': 'Basic aW5mb3RlYzpwYXNzd29yZA=='
}

};
/* export const environment = {
  production: true,
  passwordShaded: false,
  apis_url : 'https://apim.infotec.mx',
  mifos_url : 'https://mifos.infotec.mx',
  reCaptchaKey: "6LdQErYZAAAAACb2f4AgheH_SFBH131W8QCKvnvA",
  gravitee_api_keys : {
    'registro': 'b04b09eb-2176-4925-873c-dd4f8fae9985',
    'fineract': '3a1b651a-9b55-4417-a538-e01f3841f8b7',
    'curp': '13df2800-ce2b-4242-b3e1-b4663836344d'
  },
  headers_mifos : {
    'Fineract-Platform-TenantId': 'default',
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Content-Encoding': 'gzip'
  },
  headers_apis : {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Content-Encoding': 'gzip'
  },
  provisional_header:{
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Content-Encoding': 'gzip',
    'Fineract-Platform-TenantId': 'default',
    'Authorization': 'Basic aW5mb3RlYzpwYXNzd29yZA=='
}
};
 */

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI
