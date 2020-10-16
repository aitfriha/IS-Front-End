import axios from 'axios';
import { API } from '../../config/apiUrl';

class ContractStatusService {
    getContractStatus = () => axios.get(`${API}/contractStatus/all2`);

    getContractStatusById = Id => axios.post(`${API}/contractStatus/row/${Id}`);

    saveContractStatus = contractStatus => axios.post(`${API}/contractStatus/add`, contractStatus);

    updateContractStatus = contractStatus => axios.post(`${API}/contractStatus/update`, contractStatus);

    deleteContractStatusById = Id => axios.post(`${API}/contractStatus/delete/${Id}`);
}
export default new ContractStatusService();
