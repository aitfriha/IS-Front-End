import axios from 'axios';
import { API } from '../../config/apiUrl';

class EconomicStaffYearService {
    getEconomicStaffYear = () => axios.get(`${API}/economicStaffYear/all`);

    getEconomicStaffYearById = Id => axios.post(`${API}/economicStaffYear/row/${Id}`);

    saveEconomicStaffYear = EconomicStaffYear => axios.post(`${API}/economicStaffYear/add`, EconomicStaffYear);

    updateEconomicStaffYear = EconomicStaffYear => axios.post(`${API}/economicStaffYear/update`, EconomicStaffYear);

    deleteEconomicStaffYear = Id => axios.post(`${API}/economicStaffYear/delete/${Id}`);
}
export default new EconomicStaffYearService();
