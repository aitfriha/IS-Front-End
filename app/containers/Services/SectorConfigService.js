import axios from 'axios';
import { API } from '../../config/apiUrl';

class SectorConfigService {
    getConfigSectorsPrimary = (name) => axios.get(`${API}/sectors-config-primary/${name}`);

    getConfigSectors = () => axios.get(`${API}/sectors-config`);
}
export default new SectorConfigService();
