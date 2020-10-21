import axios from 'axios';
import { API } from '../../config/apiUrl';

class CompanyService {
    getCompany = () => axios.get(`${API}/company/all`);

    getCompanyById = Id => axios.post(`${API}/company/row/${Id}`);

    saveCompany = company => axios.post(`${API}/company/add`, company);

    updateCompany = company => axios.post(`${API}/company/update`, company);

    deleteCompany = Id => axios.post(`${API}/company/delete/${Id}`);
}
export default new CompanyService();
