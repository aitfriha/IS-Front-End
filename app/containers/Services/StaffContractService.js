import axios from 'axios';
import { API } from '../../config/apiUrl';

const config = {
  headers: {
    'content-type': 'multipart/form-data'
  }
};

class StaffContractService {
  getAllStaffContracts = () => axios.get(`${API}/staffContract-all`);

  saveStaffContract = (staffContract, contractTypeId, legalCategoryTypeId) => axios.post(
    `${API}/staffContract-save/contractTypeId=${contractTypeId}&legalCategoryTypeId=${legalCategoryTypeId}`,
    staffContract,
    config
  );

  updateStaffContract = (
    staffContractId,
    staffContract,
    contractTypeId,
    legalCategoryTypeId
  ) => axios.put(
    `${API}/staffContract-update/id=${staffContractId}&contractTypeId=${contractTypeId}&legalCategoryTypeId=${legalCategoryTypeId}`,
    staffContract,
    config
  );

  deleteStaffContract = staffContractId => axios.delete(`${API}/staffContract-delete/${staffContractId}`);
}
export default new StaffContractService();
