import axios from 'axios';
import { API } from '../../config/apiUrl';

class PurchaseOrderService {
    getPurchaseOrder = () => axios.get(`${API}/purchaseOrder/all`);

    getPurchaseOrderById = Id => axios.post(`${API}/purchaseOrder/row/${Id}`);

    savePurchaseOrder = PurchaseOrder => axios.post(`${API}/purchaseOrder/add`, PurchaseOrder);

    updatePurchaseOrder = PurchaseOrder => axios.post(`${API}/purchaseOrder/update`, PurchaseOrder);

    deletePurchaseOrder = Id => axios.post(`${API}/purchaseOrder/delete/${Id}`);
}
export default new PurchaseOrderService();
