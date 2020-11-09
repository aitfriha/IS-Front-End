import axios from 'axios';
import { API } from '../../config/apiUrl';

const config = {
  headers: {
    'content-type': 'multipart/form-data'
  }
};

class StaffContractService {
  addStaffDocument = (staffDocument, staffId) => axios.post(`${API}/staffDocuments-save/${staffId}`, staffDocument, config);

  deleteStaffDocument = staffDocumentId => axios.delete(`${API}/staffDocuments-delete/${staffDocumentId}`);
}
export default new StaffContractService();
