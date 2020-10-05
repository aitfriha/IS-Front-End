import axios from 'axios';
import { API } from '../../config/apiUrl';

class StateCountryService {
  getStates = () => axios.get(`${API}/state-country-all`);

  getStatesByCountry = countryId => axios.get(`${API}/state-country-all-by-country/${countryId}`);

  saveState = state => axios.post(`${API}/state-country-save`, state);

  updateState = (stateId, state) => axios.put(`${API}/state-country-update/${stateId}`, state);

  delete = stateId => axios.delete(`${API}/state-country-delete/${stateId}`);
}
export default new StateCountryService();
