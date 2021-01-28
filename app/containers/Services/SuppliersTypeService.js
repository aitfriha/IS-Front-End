import axios from 'axios';
import { API } from '../../config/apiUrl';

class SuppliersTypeService {
    getSuppliersType = () => axios.get(`${API}/supplierType/all`);

    getSuppliersTypeById = Id => axios.post(`${API}/supplierType/row/${Id}`);

    saveSuppliersType = SuppliersType => axios.post(`${API}/supplierType/add`, SuppliersType);

    updateSuppliersType = SuppliersType => axios.post(`${API}/supplierType/update`, SuppliersType);

    deleteSuppliersType = Id => axios.post(`${API}/supplierType/delete/${Id}`);
}
export default new SuppliersTypeService();
