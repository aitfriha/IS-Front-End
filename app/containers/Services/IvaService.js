import axios from 'axios';
import { API } from '../../config/apiUrl';

class IvaService {
    getIva = () => axios.get(`${API}/iva/all`);

    getIvaCountries = () => axios.get(`${API}/iva/countries`);

    getIvaStates = CountryName => axios.post(`${API}/iva/states/${CountryName}`);

    getIvaById = Id => axios.post(`${API}/iva/row/${Id}`);

    saveIva = iva => axios.post(`${API}/iva/add`, iva);

    updateIva = iva => axios.post(`${API}/iva/update`, iva);

    deleteIva = Id => axios.post(`${API}/iva/delete/${Id}`);
}
export default new IvaService();
