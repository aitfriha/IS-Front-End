import axios from 'axios';
import { API } from '../../config/apiUrl';

class AbsenceTypeService {
  getAllAbsenceTypes = () => axios.get(`${API}/absenceType-all`);

  saveAbsenceType = absenceType => axios.post(`${API}/absenceType-save`, absenceType);

  updateAbsenceType = (absenceTypeId, absenceType) => axios.put(`${API}/absenceType-update/${absenceTypeId}`, absenceType);

  deleteAbsenceType = absenceTypeId => axios.delete(`${API}/absenceType-delete/${absenceTypeId}`);
}
export default new AbsenceTypeService();
