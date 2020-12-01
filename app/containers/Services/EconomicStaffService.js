import axios from 'axios';
import { API } from '../../config/apiUrl';

class EconomicStaffService {
    getEconomicStaff = () => axios.get(`${API}/economicStaff/all`);

    getEconomicStaffById = Id => axios.post(`${API}/economicStaff/row/${Id}`);

    saveEconomicStaff = EconomicStaff => axios.post(`${API}/economicStaff/add`, EconomicStaff);

    updateEconomicStaff = EconomicStaff => axios.post(`${API}/economicStaff/update`, EconomicStaff);

    deleteEconomicStaff = Id => axios.post(`${API}/economicStaff/delete/${Id}`);
}
export default new EconomicStaffService();
