import axios from 'axios';
import { API } from '../../config/apiUrl';

class TypeOfCurrencyService {
    getTypeOfCurrency = () => axios.get(`${API}/typeOfCurrency/all`);

    getTypeOfCurrencyById = Id => axios.post(`${API}/typeOfCurrency/row/${Id}`);

    saveTypeOfCurrency = TypeOfCurrency => axios.post(`${API}/typeOfCurrency/add`, TypeOfCurrency);

    updateTypeOfCurrency = TypeOfCurrency => axios.post(`${API}/typeOfCurrency/update`, TypeOfCurrency);

    deleteTypeOfCurrency = Id => axios.post(`${API}/typeOfCurrency/delete/${Id}`);
}
export default new TypeOfCurrencyService();
