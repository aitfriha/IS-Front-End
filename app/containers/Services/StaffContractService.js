import axios from 'axios';
import { API } from '../../config/apiUrl';

const config = {
  headers: {
    'content-type': 'multipart/form-data'
  }
};

class StaffContractService {
  getAllStaffContracts = () => axios.get(`${API}/staffContract-all`);

  saveStaffContract = staffContract => axios.post(`${API}/staffContract-save`, staffContract, config);

  updateStaffContract = (staffContractId, staffContract) => axios.put(`${API}/staffContract-update/${staffContractId}`, staffContract);

  deleteStaffContract = staffContractId => axios.delete(`${API}/staffContract-delete/${staffContractId}`);
}
export default new StaffContractService();
