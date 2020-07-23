export const environment = {
  production: true,
  apis_url : 'https://apis-pre.bancodelbienestar.com.mx',
  mifos_url : 'https://backoffice-pre.bancodelbienestar.com.mx',
  headers_mifos : {
    'Fineract-Platform-TenantId': 'default',
    'Content-Type': 'application/json', 'Content-Encoding': 'Gzip',
    'Accept': 'application/json',
    'Access-Control-Allow-Origin': '*'
  },
  headers_apis : {
    'X-Gravitee-Api-Key': '6c7180e6-4855-413a-ba3d-0f8c75b97490',
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Access-Control-Allow-Origin': '*'
  }

};



