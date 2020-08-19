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



