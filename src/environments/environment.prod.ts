export const environment = {
  production: true,
  apis_url : 'https://apis.bancodelbienestar.com.mx',
  mifos_url : 'https://backoffice.bancodelbienestar.com.mx',
  headers_mifos : {
    'Fineract-Platform-TenantId': 'default',
    'Content-Type': 'application/json', 'Content-Encoding': 'Gzip'
  },
  headers_apis : {
    'X-Gravitee-Api-Key': 'apiprod',
    'Content-Type': 'application/json'
  }
};

