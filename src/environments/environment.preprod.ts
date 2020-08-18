export const environment = {
  production: true,
  passwordShaded: true,
  apis_url : 'https://sandbox-api.bancodelbienestar.com.mx',
  mifos_url : 'https://backoffice-pre.bancodelbienestar.com.mx',
  reCaptchaKey: "6LdQErYZAAAAACb2f4AgheH_SFBH131W8QCKvnvA",
  gravitee_api_keys : {
    'registro': '6c7180e6-4855-413a-ba3d-0f8c75b97490',
    'fineract': 'd9d19371-ab0c-47f1-a524-c4aa4cc71d43',
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



