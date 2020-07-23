export const environment = {
  production: true,
  apis_url : 'urlprod',
  mifos_url : 'urlmifosprod',
  headers_mifos : {
    'Fineract-Platform-TenantId': 'default',
    'Content-Type': 'application/json', 
    'Accept': 'application/json', 
    'Content-Encoding': 'gzip',
    'Access-Control-Allow-Origin': '*'
  },
  headers_apis : {
    'X-Gravitee-Api-Key': 'API_KEY_PROD',
    'Content-Type': 'application/json',
    'Accept': 'application/json', 
    'Content-Encoding': 'gzip',
    'Access-Control-Allow-Origin': '*'
  }
};

