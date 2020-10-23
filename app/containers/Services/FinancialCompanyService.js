import axios from 'axios';
import { API } from '../../config/apiUrl';

class FinancialCompanyService {
    getCompany = () => axios.get(`${API}/financialCompany/all`);

    getCompanyById = Id => axios.post(`${API}/financialCompany/row/${Id}`);

    saveCompany = company => axios.post(`${API}/financialCompany/add`, company);

    updateCompany = company => axios.post(`${API}/financialCompany/update`, company);

    deleteCompany = Id => axios.post(`${API}/financialCompany/delete/${Id}`);
}
export default new FinancialCompanyService();
