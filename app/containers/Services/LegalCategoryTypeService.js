import axios from 'axios';
import { API } from '../../config/apiUrl';

class LegalCategoryTypeService {
  getAllLegalCategoryTypes = () => axios.get(`${API}/legalCategoryType-all`);

  getAllLegalCategoryTypesByCompany = companyName => axios.get(`${API}/legalCategoryType-by-company/${companyName}`);

  saveLegalCategoryType = legalCategoryType => axios.post(`${API}/legalCategoryType-save`, legalCategoryType);

  updateLegalCategoryType = (legalCategoryTypeId, legalCategoryType) => axios.put(
    `${API}/legalCategoryType-update/${legalCategoryTypeId}`,
    legalCategoryType
  );

  deleteLegalCategoryType = legalCategoryTypeId => axios.delete(`${API}/legalCategoryType-delete/${legalCategoryTypeId}`);
}
export default new LegalCategoryTypeService();
