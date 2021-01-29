import axios from 'axios';
import { API } from '../../config/apiUrl';

class PurchaseOrderService {
    getPurchaseOrder = () => axios.get(`${API}/purchaseOrderAcceptance/all`);

    getPurchaseOrderById = Id => axios.post(`${API}/purchaseOrderAcceptance/row/${Id}`);

    savePurchaseOrder = PurchaseOrder => axios.post(`${API}/purchaseOrderAcceptance/add`, PurchaseOrder);

    updatePurchaseOrder = PurchaseOrder => axios.post(`${API}/purchaseOrderAcceptance/update`, PurchaseOrder);

    deletePurchaseOrder = Id => axios.post(`${API}/purchaseOrderAcceptance/delete/${Id}`);
}
export default new PurchaseOrderService();
