import axios from 'axios';
import { API } from '../../config/apiUrl';

class StaffEconomicContractInformationService {
  getAllStaffEconomicContractInformations = () => axios.get(`${API}/staffEconomicContractInformation-all`);

  saveStaffEconomicContractInformation = staffEconomicContractInformation => axios.post(
    `${API}/staffEconomicContractInformation-save`,
    staffEconomicContractInformation
  );

  updateStaffEconomicContractInformation = (
    staffEconomicContractInformationId,
    staffEconomicContractInformation
  ) => axios.put(
    `${API}/staffEconomicContractInformation-update/${staffEconomicContractInformationId}`,
    staffEconomicContractInformation
  );

  deleteStaffEconomicContractInformation = staffEconomicContractInformationId => axios.delete(
    `${API}/staffEconomicContractInformation-delete/${staffEconomicContractInformationId}`
  );
}
export default new StaffEconomicContractInformationService();
