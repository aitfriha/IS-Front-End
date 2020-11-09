import axios from 'axios';
import { API } from '../../config/apiUrl';

const config = {
  headers: {
    'content-type': 'multipart/form-data'
  }
};

class StaffService {
  getStaffs = () => axios.get(`${API}/staff/staff-all`);

  getStaffById = staffId => axios.get(`${API}/staff/${staffId}`);

  getNotAssignedStaffs = () => axios.get(`${API}/staff/staff-no-assigned`);

  saveStaff = data => axios.post(`${API}/staff/staff-add`, data, config);

  updateStaff = (staffId, cityId, data) => axios.put(
    `${API}/staff/staff-update/staffId=${staffId}&cityId=${cityId}`,
    data
  );

  assignLevelToStaff = objects => axios.post(`${API}/staff/assign-level-staff`, objects);

  getStaffsByLevel = (levelId, isLeader) => axios.get(
    `${API}/staff/get-staff-by-level/levelId=${levelId}&isLeader=${isLeader}/`
  );
}
export default new StaffService();
