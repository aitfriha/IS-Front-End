import axios from 'axios';
import { API } from '../../config/apiUrl';

class EconomicStaffMonthService {
    getEconomicStaffMonth = () => axios.get(`${API}/economicStaffMonth/all`);

    getEconomicStaffMonthById = Id => axios.post(`${API}/economicStaffMonth/row/${Id}`);

    saveEconomicStaffMonth = EconomicStaffMonth => axios.post(`${API}/economicStaffMonth/add`, EconomicStaffMonth);

    updateEconomicStaffMonth = EconomicStaffMonth => axios.post(`${API}/economicStaffMonth/update`, EconomicStaffMonth);

    deleteEconomicStaffMonth = Id => axios.post(`${API}/economicStaffMonth/delete/${Id}`);
}
export default new EconomicStaffMonthService();
