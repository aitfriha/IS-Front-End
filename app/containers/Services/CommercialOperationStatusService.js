import axios from 'axios';
import { API } from '../../config/apiUrl';

class CommercialOperationStatusService {
    getCommercialOperationStatus = () => axios.get(`${API}/commercialOperationStatus/all`);
}
export default new CommercialOperationStatusService();
