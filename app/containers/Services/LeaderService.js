import axios from 'axios';
import { API } from '../../config/apiUrl';

class LeaderService {
    getLeader = () => axios.get(`${API}/leaders`);
}
export default new LeaderService();
