export const environment = {
  production: true,
  apis_url : 'https://apis-pre.bancodelbienestar.com.mx',
  mifos_url : 'https://backoffice-pre.bancodelbienestar.com.mx',
  headers_mifos : {
    'Fineract-Platform-TenantId': 'default',
    'Content-Type': 'application/json', 'Content-Encoding': 'Gzip'
  },
  headers_apis : {
    'X-Gravitee-Api-Key': 'debe ser una llava de desarrolo',
    'Content-Type': 'application/json'
  }

};



