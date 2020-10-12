import axios from 'axios';
import { API } from '../../config/apiUrl';

class CountryConfigService {
    getCountryConfigByName = (name) => axios.get(`${API}/country/${name}`);

    getCountryConfig = () => axios.get(`${API}/countries/`);

    saveCountryConfig = (countryConfig) => axios.post(`${API}/country/`, countryConfig);
}
export default new CountryConfigService();
