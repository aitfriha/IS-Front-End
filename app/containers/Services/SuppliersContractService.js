import axios from 'axios';
import { API } from '../../config/apiUrl';

class SuppliersContractService {
    getSuppliersContract = () => axios.get(`${API}/supplierContract/all`);

    getSuppliersContractById = Id => axios.post(`${API}/supplierContract/row/${Id}`);

    saveSuppliersContract = SuppliersContract => axios.post(`${API}/supplierContract/add`, SuppliersContract);

    updateSuppliersContract = SuppliersContract => axios.post(`${API}/supplierContract/update`, SuppliersContract);

    deleteSuppliersContract = Id => axios.post(`${API}/supplierContract/delete/${Id}`);
}
export default new SuppliersContractService();
