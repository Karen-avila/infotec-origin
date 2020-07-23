export const environment = {
  production: true,
  apis_url : 'urlprod',
  mifos_url : 'urlmifosprod',
  headers_mifos : {
    'Fineract-Platform-TenantId': 'default',
    'Content-Type': 'application/json', 'Content-Encoding': 'Gzip'
  },
  headers_apis : {
    'X-Gravitee-Api-Key': 'apiprod',
    'Content-Type': 'application/json'
  }
};

