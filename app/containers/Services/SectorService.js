import axios from 'axios';
import { API } from '../../config/apiUrl';

class SectorService {
    getSectorsType = (type) => axios.get(`${API}/sectors-type/${type}`);

    getSectors = () => axios.get(`${API}/sectors`);
}
export default new SectorService();
