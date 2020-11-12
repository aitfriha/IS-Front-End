import axios from 'axios';
import { API } from '../../config/apiUrl';

class ContractService {
    getContract = () => axios.get(`${API}/contract/all`);

    getContractById = Id => axios.post(`${API}/contract/row/${Id}`);

    saveContract = contract => axios.post(`${API}/contract/add`, contract);

    updateContract = contract => axios.post(`${API}/contract/update`, contract);

    deleteContract = Id => axios.post(`${API}/contract/delete/${Id}`);
}
export default new ContractService();
