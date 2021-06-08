import axios from 'axios';
import { API } from '../../config/apiUrl';

class HistoryActionService {
    getActionHistory = () => axios.get(`${API}/actionHistory/all`);

    saveActionHistory = actionHistory => axios.post(`${API}/actionHistory/add`, actionHistory);
}
export default new HistoryActionService();
