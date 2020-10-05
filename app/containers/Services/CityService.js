import axios from 'axios';
import { API } from '../../config/apiUrl';

class CityService {
  getCities = () => axios.get(`${API}/city-all`);

  getCitiesByState = stateId => axios.get(`${API}/city-all-by-state/${stateId}`);

  saveCity = (city) => axios.post(`${API}/city-save`, city);

  updateCity = (cityId, city) => axios.put(`${API}/city-update/${cityId}`, city);

  deleteCity = cityId => axios.delete(`${API}/city-delete/${cityId}`);
}
export default new CityService();
