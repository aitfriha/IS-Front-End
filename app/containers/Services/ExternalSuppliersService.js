import axios from 'axios';
import { API } from '../../config/apiUrl';

class ExternalSuppliersService {
    getExternalSuppliers = () => axios.get(`${API}/externalSupplier/all`);

    getExternalSuppliersById = Id => axios.post(`${API}/externalSupplier/row/${Id}`);

    saveExternalSuppliers = ExternalSuppliers => axios.post(`${API}/externalSupplier/add`, ExternalSuppliers);

    updateExternalSuppliers = ExternalSuppliers => axios.post(`${API}/externalSupplier/update`, ExternalSuppliers);

    deleteExternalSuppliers = Id => axios.post(`${API}/externalSupplier/delete/${Id}`);
}
export default new ExternalSuppliersService();
