import axios from 'axios';
import { API } from '../../config/apiUrl';

class AbsenceTypeService {
  getAllAbsenceTypes = () => axios.get(`${API}/absenceType-all`);

  getAllByState = stateId => axios.get(`${API}/absenceType-all-by-state/${stateId}`);

  saveAbsenceType = (absenceType, stateCountryId) => axios.post(`${API}/absenceType-save/${stateCountryId}`, absenceType);

  updateAbsenceType = (absenceTypeId, absenceType) => axios.put(`${API}/absenceType-update/${absenceTypeId}`, absenceType);

  deleteAbsenceType = absenceTypeId => axios.delete(`${API}/absenceType-delete/${absenceTypeId}`);
}
export default new AbsenceTypeService();
