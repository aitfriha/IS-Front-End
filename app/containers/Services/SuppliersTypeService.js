import axios from 'axios';
import { API } from '../../config/apiUrl';

class SuppliersTypeService {
    getSuppliersType = () => axios.get(`${API}/suppliersType/all`);

    getSuppliersTypeById = Id => axios.post(`${API}/suppliersType/row/${Id}`);

    saveSuppliersType = SuppliersType => axios.post(`${API}/suppliersType/add`, SuppliersType);

    updateSuppliersType = SuppliersType => axios.post(`${API}/suppliersType/update`, SuppliersType);

    deleteSuppliersType = Id => axios.post(`${API}/suppliersType/delete/${Id}`);
}
export default new SuppliersTypeService();
