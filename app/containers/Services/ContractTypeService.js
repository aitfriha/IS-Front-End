import axios from 'axios';
import { API } from '../../config/apiUrl';

class ContractTypeService {
  getAllContractTypes = () => axios.get(`${API}/contractType-all`);

  saveContractType = contractType => axios.post(`${API}/contractType-save`, contractType);

  updateContractType = (contractTypeId, contractType) => axios.put(`${API}/contractType-update/${contractTypeId}`, contractType);

  deleteContractType = contractTypeId => axios.delete(`${API}/contractType-delete/${contractTypeId}`);
}
export default new ContractTypeService();
