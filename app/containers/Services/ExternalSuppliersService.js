import axios from 'axios';
import { API } from '../../config/apiUrl';

class ExternalSuppliersService {
    getExternalSuppliers = () => axios.get(`${API}/externalSuppliers/all`);

    getExternalSuppliersById = Id => axios.post(`${API}/externalSuppliers/row/${Id}`);

    saveExternalSuppliers = ExternalSuppliers => axios.post(`${API}/externalSuppliers/add`, ExternalSuppliers);

    updateExternalSuppliers = ExternalSuppliers => axios.post(`${API}/externalSuppliers/update`, ExternalSuppliers);

    deleteExternalSuppliers = Id => axios.post(`${API}/externalSuppliers/delete/${Id}`);
}
export default new ExternalSuppliersService();
