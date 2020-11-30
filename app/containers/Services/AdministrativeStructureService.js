import axios from 'axios';
import ENDPOINTS from '../../api/endpoints';

class AdministrativeStructureService {
  getLevels = () => axios.get(`${ENDPOINTS.ADMINISTRATIVESTRUCTURE}/all`);

  saveLevel = objects => axios.post(`${ENDPOINTS.ADMINISTRATIVESTRUCTURE}/add`, objects);

  updateLevel = (objects, levelId) => axios.put(
    `${ENDPOINTS.ADMINISTRATIVESTRUCTURE}/update/${levelId}`,
    objects
  );

  deleteLevel = levelId => axios.delete(`${ENDPOINTS.ADMINISTRATIVESTRUCTURE}/delete/${levelId}`);

  getLevelByType = type => axios.get(`${ENDPOINTS.ADMINISTRATIVESTRUCTURE}/all-by-type/${type}`);

  getLevelTree = levelId => axios.get(`${ENDPOINTS.ADMINISTRATIVESTRUCTURE}/level-tree/${levelId}`);

  setLevelStaffs = objects => axios.post(`${ENDPOINTS.ADMINISTRATIVESTRUCTURE}/level-assign`, objects);
}
export default new AdministrativeStructureService();
