import axios from 'axios';
import { API } from '../../config/apiUrl';

class StaffContractHistoryService {
  getAllStaffContractHistorys = () => axios.get(`${API}/staffContractHistory-all`);

  getStaffContractHistoryByStaff = id => axios.get(`${API}/staffContractHistory/${id}`);

  saveStaffContractHistory = staffContractHistory => axios.post(`${API}/staffContractHistory-save`, staffContractHistory);

  updateStaffContractHistory = (staffContractHistoryId, staffContractHistory) => axios.put(
    `${API}/staffContractHistory-update/${staffContractHistoryId}`,
    staffContractHistory
  );

  deleteStaffContractHistory = staffContractHistoryId => axios.delete(
    `${API}/staffContractHistory-delete/${staffContractHistoryId}`
  );
}
export default new StaffContractHistoryService();
