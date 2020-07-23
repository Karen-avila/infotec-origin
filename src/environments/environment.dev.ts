export const environment = {
  production: true,
  apis_url : 'urldesarrolo',
  mifos_url : 'urlmifosdesarrollo',
  headers_mifos : {
    'Fineract-Platform-TenantId': 'default',
    'Content-Type': 'application/json', 
    'Accept': 'application/json', 
    'Content-Encoding': 'gzip',
    'Access-Control-Allow-Origin': '*'
  },
  headers_apis : {
    'X-Gravitee-Api-Key': 'API_KEY_DEV',
    'Content-Type': 'application/json',
    'Accept': 'application/json', 
    'Content-Encoding': 'gzip',
    'Access-Control-Allow-Origin': '*'
  }
};



