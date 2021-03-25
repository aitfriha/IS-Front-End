import axios from 'axios';
import { API } from '../../config/apiUrl';

class CommercialOperationService {
    getCommercialOperation = () => axios.get(`${API}/commercialOperation/all`);

    getCommercialOperationById = Id => axios.post(`${API}/commercialOperation/row/${Id}`);

    saveCommercialOperation = commercialOperation => axios.post(`${API}/commercialOperation/add`, commercialOperation);

    updateCommercialOperation = commercialOperation => axios.post(`${API}/commercialOperation/update`, commercialOperation);

    deleteCommercialOperation = Id => axios.post(`${API}/commercialOperation/delete/${Id}`);
}
export default new CommercialOperationService();
