import axios from 'axios';
import { API } from '../../config/apiUrl';

class RetentionService {
    getRetention = () => axios.get(`${API}/retention/all`);

    getRetentionById = Id => axios.post(`${API}/retention/row/${Id}`);

    saveRetention = iva => axios.post(`${API}/retention/add`, iva);

    updateRetention = iva => axios.post(`${API}/retention/update`, iva);

    deleteRetention = Id => axios.post(`${API}/retention/delete/${Id}`);
}
export default new RetentionService();
