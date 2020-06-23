const searchCPService = {
  async init(value, model) {
    await fetch(`https://api-sepomex.hckdrk.mx/query/info_cp/${value}?type=simplified`)
    .then(( response ) => {
      return response.json();
    }).then((json) => {
      model.cp = json.response.cp;
      model.entidadFederativa = json.response.estado;
      model.tipoAsentamiento = json.response.tipo_asentamiento;
      model.municipio = json.response.municipio;
      model.asentamiento = json.response.asentamiento;
      return model;
    });
  },
};

export default searchCPService;
