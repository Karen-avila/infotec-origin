import { scian } from '../models/scian2018.min';
import { Options } from 'ng5-slider';

const activitiesService = {
  init(activities) {
    activities.sectorList = Object.keys(scian.sector).map((key) => {
      return {codigo: scian.sector[key].codigo, titulo: scian.sector[key].titulo};
    });
    return activities;
  },
  getSubsector(activities, sector) {
    const sectorList = scian.sector.find(row => row.codigo === sector);
    activities.subsectorList = Object.keys(sectorList.subsector).map((key) => {
      return {codigo: sectorList.subsector[key].codigo, titulo: sectorList.subsector[key].titulo};
    });
    activities.ramaList = [];
    activities.subramaList = [];
    activities.giroList = [];
    return activities;
  },
  getRama(activities, sector, subsector) {
    const sectorList = scian.sector.find(row => row.codigo === sector);
    const subsectorList = sectorList.subsector.find(row => row.codigo === subsector);
    activities.ramaList = Object.keys(subsectorList.rama).map((key) => {
      return {codigo: subsectorList.rama[key].codigo, titulo: subsectorList.rama[key].titulo};
    });
    activities.subramaList = [];
    activities.giroList = [];
    return activities;
  },
  getSubrama(activities, sector, subsector, rama) {
    const sectorList = scian.sector.find(row => row.codigo === sector);
    const subsectorList = sectorList.subsector.find(row => row.codigo === subsector);
    const ramaList = subsectorList.rama.find(row => row.codigo === rama);
    activities.subramaList = Object.keys(ramaList.subrama).map((key) => {
      return {codigo: ramaList.subrama[key].codigo, titulo: ramaList.subrama[key].titulo};
    });
    activities.giroList = [];
    return activities;
  },
  getGiro(activities, sector, subsector, rama, subrama) {
    const sectorList = scian.sector.find(row => row.codigo === sector);
    const subsectorList = sectorList.subsector.find(row => row.codigo === subsector);
    const ramaList = subsectorList.rama.find(row => row.codigo === rama);
    const subramaList = ramaList.subrama.find(row => row.codigo === subrama);
    activities.giroList = Object.keys(subramaList.giro).map((key) => {
      return {codigo: subramaList.giro[key].codigo, titulo: subramaList.giro[key].titulo};
    });
    return activities;
  },
};

export default activitiesService;
