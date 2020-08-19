// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: true,
  passwordShaded: true,
  apis_url : 'https://sandbox-api.bancodelbienestar.com.mx',
  mifos_url : 'https://backoffice-pre.bancodelbienestar.com.mx',
  reCaptchaKey: "6LdQErYZAAAAACb2f4AgheH_SFBH131W8QCKvnvA",
  gravitee_api_keys : {
    'registro': 'b338ca04-1360-4ad8-8c57-51ddaf5ea410',
    'fineract': 'd9d19371-ab0c-47f1-a524-c4aa4cc71d43',
    'curp': 'f9518304-7c90-4a75-8cad-9a3e1779694a'
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
