import axios from 'axios';
import { API } from '../../config/apiUrl';

class LegalCategoryTypeService {
  getAllLegalCategoryTypes = () => axios.get(`${API}/legalCategoryType/all`);

  getAllByCompany = companyId => axios.get(`${API}/legalCategoryType/all-by-company/${companyId}`);

  saveLegalCategoryType = legalCategoryType => axios.post(`${API}/legalCategoryType/add`, legalCategoryType);

  updateLegalCategoryType = legalCategoryType => axios.put(`${API}/legalCategoryType/update`, legalCategoryType);

  deleteLegalCategoryType = legalCategoryTypeId => axios.delete(`${API}/legalCategoryType/delete/${legalCategoryTypeId}`);
}
export default new LegalCategoryTypeService();
