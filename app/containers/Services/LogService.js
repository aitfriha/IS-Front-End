import axios from 'axios';
import { API } from '../../config/apiUrl';

class LogService {
  saveLog = (className) => axios.post(`${API}/download-excel/${className}`, {});
}
export default new LogService();
