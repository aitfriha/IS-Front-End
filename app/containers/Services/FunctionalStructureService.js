import axios from 'axios';
import { API } from '../../config/apiUrl';

class FunctionalStructureService {
  getLevels = () => axios.get(`${API}/levels`);

  saveLevel = objects => axios.post(`${API}/level-save`, objects);

  getLevelByType = type => axios.get(`${API}/levels-type/${type}`);

  setLevelStaffs = objects => axios.post(`${API}/level-assign`, objects);
}
export default new FunctionalStructureService();
