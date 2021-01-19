import axios from 'axios';
import { API } from '../../config/apiUrl';

class CurrencyService {
    getCurrency = () => axios.get(`${API}/currency/all`);

    getFilteredCurrency = () => axios.get(`${API}/currency/Filtered`);

    getCurrencyById = Id => axios.post(`${API}/currency/row/${Id}`);

    saveCurrency = currency => axios.post(`${API}/currency/add`, currency);

    updateCurrency = currency => axios.post(`${API}/currency/update`, currency);

    deleteCurrency = Id => axios.post(`${API}/currency/delete/${Id}`);
}
export default new CurrencyService();
