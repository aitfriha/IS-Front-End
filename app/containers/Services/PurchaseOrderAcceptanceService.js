import axios from 'axios';
import { API } from '../../config/apiUrl';

class PurchaseOrderAcceptanceService {
    getPurchaseOrderAcceptance = () => axios.get(`${API}/purchaseOrderAcceptance/all`);

    getPurchaseOrderAcceptanceById = Id => axios.post(`${API}/purchaseOrderAcceptance/row/${Id}`);

    savePurchaseOrderAcceptance = PurchaseOrderAcceptance => axios.post(`${API}/purchaseOrderAcceptance/add`, PurchaseOrderAcceptance);

    updatePurchaseOrderAcceptance = PurchaseOrderAcceptance => axios.post(`${API}/purchaseOrderAcceptance/update`, PurchaseOrderAcceptance);

    deletePurchaseOrderAcceptance = Id => axios.post(`${API}/purchaseOrderAcceptance/delete/${Id}`);
}
export default new PurchaseOrderAcceptanceService();
