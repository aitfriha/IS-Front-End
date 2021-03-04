import axios from 'axios';
import { API } from '../../config/apiUrl';

class SuppliersPaymentService {
    getSuppliersPayment = () => axios.get(`${API}/supplierPayment/all`);

    getSuppliersPaymentById = Id => axios.post(`${API}/supplierPayment/row/${Id}`);

    saveSuppliersPayment = SuppliersPayment => axios.post(`${API}/supplierPayment/add`, SuppliersPayment);

    updateSuppliersPayment = SuppliersPayment => axios.post(`${API}/supplierPayment/update`, SuppliersPayment);

    deleteSuppliersPayment = Id => axios.post(`${API}/supplierPayment/delete/${Id}`);
}
export default new SuppliersPaymentService();
