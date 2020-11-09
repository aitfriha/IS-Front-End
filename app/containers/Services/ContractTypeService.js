import axios from 'axios';
import { API } from '../../config/apiUrl';

class ContractTypeService {
  getAllContractTypes = () => axios.get(`${API}/contractType/all`);

  getAllByState = stateId => axios.get(`${API}/contractType/all-by-state/${stateId}`);

  saveContractType = contractType => axios.post(`${API}/contractType/add`, contractType);

  updateContractType = contractType => axios.put(`${API}/contractType/update`, contractType);

  deleteContractType = contractTypeId => axios.delete(`${API}/contractType/delete/${contractTypeId}`);
}
export default new ContractTypeService();
