import axios from 'axios';
import { API } from '../../config/apiUrl';

class AreaService {
  getAreas = () => axios.get(`${API}/area-all`);

  getAreasByDirection = (directionId) => axios.get(`${API}/area-by-direction/${directionId}`);

  saveArea = (area) => axios.post(`${API}/area-add`, area);
}
export default new AreaService();
