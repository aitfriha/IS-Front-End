import axios from 'axios';
import { API } from '../../config/apiUrl';

const config = {
  headers: {
    'content-type': 'multipart/form-data'
  }
};

class StaffService {
  getStaffs = () => axios.get(`${API}/staff/staff-all`);

  getStaffById = staffId => axios.get(`${API}/staff/staff-by-id/${staffId}`);

  getFunctionalNotAssignedStaffs = () => axios.get(`${API}/staff/staff-no-assigned-functional`);

  getAdministrativeNotAssignedStaffs = () => axios.get(`${API}/staff/staff-no-assigned-administrative`);

  getAdministrativeNotAssignedStaffsByCompany = companyId => axios.get(`${API}/staff/staff-no-assigned-administrative-by-company/${companyId}`);

  saveStaff = data => axios.post(`${API}/staff/staff-add`, data, config);

  updateStaff = (staffId, cityId, data) => axios.put(
    `${API}/staff/staff-update/staffId=${staffId}&cityId=${cityId}`,
    data
  );

  assignFunctionalLevelToStaff = objects => axios.post(`${API}/staff/assign-functional-level-staff`, objects);

  assignAdministrativeLevelToStaff = objects => axios.post(`${API}/staff/assign-administrative-level-staff`, objects);

  getStaffsByFunctionalLevel = (levelId, isFunctionalLeader) => axios.get(
    `${API}/staff/get-staff-by-functional-level/levelId=${levelId}&isFunctionalLeader=${isFunctionalLeader}/`
  );

  getStaffsByAdministrativeLevel = (levelId, isAdministrativeLeader) => axios.get(
    `${API}/staff/get-staff-by-administrative-level/levelId=${levelId}&isAdministrativeLeader=${isAdministrativeLeader}/`
  );

  getStaffsByIsFunctionalLeader = isFunctionalLeader => axios.get(
    `${API}/staff/get-staff-by-isFunctionalLeader/isFunctionalLeader=${isFunctionalLeader}/`
  );

  getStaffsByIsAdministrativeLeader = isAdministrativeLeader => axios.get(
    `${API}/staff/get-staff-by-isAdministrativeLeader/isAdministrativeLeader=${isAdministrativeLeader}/`
  );
}
export default new StaffService();
