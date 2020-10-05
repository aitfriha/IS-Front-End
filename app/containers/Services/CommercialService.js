import axios from 'axios';
import { API } from '../../config/apiUrl';

class CommercialService {
    getCommercials = () => axios.get(`${API}/commercials`);

    saveAddress = address => axios.post(`${API}/address`, address);

    deleteAlgorithm = algorithmId => axios.delete(`${API}/algorithm/delete/${algorithmId}`);
}
export default new CommercialService();
