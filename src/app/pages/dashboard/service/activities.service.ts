import { scian } from '../models/scian2018.min';

const activitiesService = {
  init() {
    return Object.keys(scian.sector).map((key) => {
      return {codigo: scian.sector[key].codigo, titulo: scian.sector[key].titulo};
    });
  },
  getSubsector(sector) {
    const sectorList = scian.sector.find(row => row.codigo === sector);
    return Object.keys(sectorList.subsector).map((key) => {
      return {codigo: sectorList.subsector[key].codigo, titulo: sectorList.subsector[key].titulo};
    });
  },
  getRama(sector, subsector) {
    const sectorList = scian.sector.find(row => row.codigo === sector);
    const subsectorList = sectorList.subsector.find(row => row.codigo === subsector);
    return Object.keys(subsectorList.rama).map((key) => {
      return {codigo: subsectorList.rama[key].codigo, titulo: subsectorList.rama[key].titulo};
    });
  },
  getSubrama(sector, subsector, rama) {
    const sectorList = scian.sector.find(row => row.codigo === sector);
    const subsectorList = sectorList.subsector.find(row => row.codigo === subsector);
    const ramaList = subsectorList.rama.find(row => row.codigo === rama);
    return Object.keys(ramaList.subrama).map((key) => {
      return {codigo: ramaList.subrama[key].codigo, titulo: ramaList.subrama[key].titulo};
    });
  },
  getGiro(sector, subsector, rama, subrama) {
    const sectorList = scian.sector.find(row => row.codigo === sector);
    const subsectorList = sectorList.subsector.find(row => row.codigo === subsector);
    const ramaList = subsectorList.rama.find(row => row.codigo === rama);
    const subramaList = ramaList.subrama.find(row => row.codigo === subrama);
    return Object.keys(subramaList.giro).map((key) => {
      return {codigo: subramaList.giro[key].codigo, titulo: subramaList.giro[key].titulo};
    });
  },
};

export default activitiesService;
