import axios from 'axios';
import { API } from '../../config/apiUrl';

class OperationConfigService {
  getOperationConfig = () => axios.get(`${API}/operation-config-all`);

  saveOperationConfig = (operationConfig) => axios.post(`${API}/operation-config-add`, operationConfig);
}
export default new OperationConfigService();
