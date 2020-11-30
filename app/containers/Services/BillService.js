import axios from 'axios';
import { API } from '../../config/apiUrl';

class BillService {
    getBill = () => axios.get(`${API}/bill/all`);

    getBillById = Id => axios.post(`${API}/bill/row/${Id}`);

    saveBill = bill => axios.post(`${API}/bill/add`, bill);

    updateBill = bill => axios.post(`${API}/bill/update`, bill);

    deleteBill = Id => axios.post(`${API}/bill/delete/${Id}`);
}
export default new BillService();
