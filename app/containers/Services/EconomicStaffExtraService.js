import axios from 'axios';
import { API } from '../../config/apiUrl';

class EconomicStaffExtraService {
    getEconomicStaffExtra = () => axios.get(`${API}/economicStaffExtra/all`);

    getEconomicStaffExtraById = Id => axios.post(`${API}/economicStaffExtra/row/${Id}`);

    saveEconomicStaffExtra = EconomicStaffExtra => axios.post(`${API}/economicStaffExtra/add`, EconomicStaffExtra);

    updateEconomicStaffExtra = EconomicStaffExtra => axios.post(`${API}/economicStaffExtra/update`, EconomicStaffExtra);

    deleteEconomicStaffExtra = Id => axios.post(`${API}/economicStaffExtra/delete/${Id}`);
}
export default new EconomicStaffExtraService();
