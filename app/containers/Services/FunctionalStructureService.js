import axios from 'axios';
import { API } from '../../config/apiUrl';

class FunctionalStructureService {
  getLevels = () => axios.get(`${API}/levels`);

  saveLevel = objects => axios.post(`${API}/level-save`, objects);

  updateLevel = (objects, levelId) => axios.put(`${API}/level-update/${levelId}`, objects);

  deleteLevel = levelId => axios.delete(`${API}/level-delete/${levelId}`);

  getLevelByType = type => axios.get(`${API}/levels-type/${type}`);

  getLevelTree = levelId => axios.get(`${API}/level-tree/${levelId}`);

  setLevelStaffs = objects => axios.post(`${API}/level-assign`, objects);
}
export default new FunctionalStructureService();
