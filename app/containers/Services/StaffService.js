import axios from 'axios';
import { API } from '../../config/apiUrl';

class StaffService {
  getStaffs = () => axios.get(`${API}/staff-all`);

  getNotAssignedStaffs = () => axios.get(`${API}/staff-no-assigned`);

  saveStaff = staff => axios.post(`${API}/staff-add`, staff);

  assignLevelToStaff = objects => axios.post(`${API}/assign-level-staff`, objects);

  getStaffsByLevel = levelId => axios.get(`${API}/get-staff-by-level/${levelId}`);
}
export default new StaffService();
