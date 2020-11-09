import axios from 'axios';
import { API } from '../../config/apiUrl';

class StateCountryService {
  getStates = () => axios.get(`${API}/state-country-all`);

  getStatesByCountry = countryId => axios.get(`${API}/stateCountry/statesByCountry/${countryId}`);

  saveState = datafinal => axios.post(`${API}/city/add`, datafinal);

  updateState = (stateId, state) => axios.put(`${API}/state-country-update/${stateId}`, state);

  delete = stateId => axios.delete(`${API}/state-country-delete/${stateId}`);

  saveCountryStateCity = state => axios.post(`${API}/country-statecity-save`, state);
}
export default new StateCountryService();
