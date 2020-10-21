import axios from 'axios';
import { API } from '../../config/apiUrl';

class StaffEconomicContractInformationHistoryService {
  getAllStaffEconomicContractInformationHistorys = () => axios.get(`${API}/staffEconomicContractInformationHistory-all`);

  getStaffEconomicContractInformationHistoryByStaff = id => axios.get(`${API}/staffEconomicContractInformationHistory/${id}`);

  saveStaffEconomicContractInformationHistory = staffEconomicContractInformationHistory => axios.post(
    `${API}/staffEconomicContractInformationHistory-save`,
    staffEconomicContractInformationHistory
  );

  updateStaffEconomicContractInformationHistory = (
    staffEconomicContractInformationHistoryId,
    staffEconomicContractInformationHistory
  ) => axios.put(
    `${API}/staffEconomicContractInformationHistory-update/${staffEconomicContractInformationHistoryId}`,
    staffEconomicContractInformationHistory
  );

  deleteStaffEconomicContractInformationHistory = staffEconomicContractInformationHistoryId => axios.delete(
    `${API}/staffEconomicContractInformationHistory-delete/${staffEconomicContractInformationHistoryId}`
  );
}
export default new StaffEconomicContractInformationHistoryService();
