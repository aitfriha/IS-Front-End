import axios from 'axios';
import { API } from '../../config/apiUrl';

const config = {
  headers: {
    'content-type': 'multipart/form-data'
  }
};

class StaffService {
  getStaffs = () => axios.get(`${API}/staff-all`);

  getNotAssignedStaffs = () => axios.get(`${API}/staff-no-assigned`);

  saveStaff = data => axios.post(`${API}/staff-add`, data, config);

  assignLevelToStaff = objects => axios.post(`${API}/assign-level-staff`, objects);

  getStaffsByLevel = (levelId, isLeader) => axios.get(
    `${API}/get-staff-by-level/levelId=${levelId}&isLeader=${isLeader}/`
  );
}
export default new StaffService();
