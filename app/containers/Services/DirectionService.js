import axios from 'axios';
import { API } from '../../config/apiUrl';

class DirectionService {
  getDirections = () => axios.get(`${API}/direction-all`);

  saveDirection = (direction) => axios.post(`${API}/direction-add`, direction);
}
export default new DirectionService();
