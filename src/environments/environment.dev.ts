export const environment = {
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
  }
};


