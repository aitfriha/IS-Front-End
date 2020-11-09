import axios from 'axios';
import { API } from '../../config/apiUrl';

class ContractTypeService {
  getAllContractTypes = () => axios.get(`${API}/contractType-all`);

  getAllByState = stateId => axios.get(`${API}/contractType-all-by-state/${stateId}`);

  saveContractType = contractType => axios.post(`${API}/add`, contractType);

  updateContractType = (contractTypeId, contractType) => axios.put(`${API}/contractType-update/${contractTypeId}`, contractType);

  deleteContractType = contractTypeId => axios.delete(`${API}/delete/${contractTypeId}`);
}
export default new ContractTypeService();
