import axios from 'axios';
import { API } from '../../config/apiUrl';

class AbsenceTypeService {
  getAllAbsenceTypes = () => axios.get(`${API}/absenceType/absenceType-all`);

  getAllByState = stateId => axios.get(`${API}/absenceType/absenceType-all-by-state/${stateId}`);

  saveAbsenceType = absenceType => axios.post(`${API}/absenceType/add`, absenceType);

  updateAbsenceType = (absenceTypeId, absenceType) => axios.put(
    `${API}/absenceType/absenceType-update/${absenceTypeId}`,
    absenceType
  );

  deleteAbsenceType = absenceTypeId => axios.delete(`${API}/absenceType/absenceType-delete/${absenceTypeId}`);
}
export default new AbsenceTypeService();
