export const environment = {
  production: true,
  apis_url : 'https://apis.infotec.mx',
  mifos_url : 'https://mifos.infotec.mx',
  gravitee_api_keys : {
    'registro': '1',
    'clients': '1'
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



