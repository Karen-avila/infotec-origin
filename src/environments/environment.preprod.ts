export const environment = {
  production: true,
  passwordShaded: false,
  apis_url : 'https://apis-pre.bancodelbienestar.com.mx',
  mifos_url : 'https://backoffice-pre.bancodelbienestar.com.mx',
  reCaptchaKey: "6LdQErYZAAAAACb2f4AgheH_SFBH131W8QCKvnvA",
  gravitee_api_keys : {
    'registro': '6c7180e6-4855-413a-ba3d-0f8c75b97490',
    'fineract': '9e2a3bba-a89f-405d-a56d-236d9671a99d'
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



