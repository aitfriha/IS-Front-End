import axios from 'axios';
import { API } from '../../config/apiUrl';

class FunctionalStructureService {
  getAllLevelConfig = () => axios.get(`${API}/levels-config`);

  saveLevelConfig = (level, parentName) => axios.post(`${API}/level/${parentName}`, level);

  getLevelByType = type => axios.get(`${API}/levels-type/${type}`);

  setLevelStaffs = objects => axios.post(`${API}/level-assign`, objects);

  getLevelConfigByLevel1 = level1 => axios.get(`${API}/levels-config-level1/${level1}`);

  getLevelConfigByLevel2 = level2 => axios.get(`${API}/levels-config-level2/${level2}`);

  getLevelConfigByLevel3 = level3 => axios.get(`${API}/levels-config-level3/${level3}`);
}
export default new FunctionalStructureService();
