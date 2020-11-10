import axios from 'axios';
import { API } from '../../config/apiUrl';

class AbsenceTypeService {
  getAllAbsenceTypes = () => axios.get(`${API}/absenceType/all`);

  getAllByState = stateId => axios.get(`${API}/absenceType/all-by-state/${stateId}`);

  saveAbsenceType = absenceType => axios.post(`${API}/absenceType/add`, absenceType);

  updateAbsenceType = absenceType => axios.put(`${API}/absenceType/update`, absenceType);

  deleteAbsenceType = absenceTypeId => axios.delete(`${API}/absenceType/delete/${absenceTypeId}`);
}
export default new AbsenceTypeService();
