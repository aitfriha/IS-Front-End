import axios from 'axios';
import { API } from '../../config/apiUrl';

class CountryService {
    getCountries = () => axios.get(`${API}/county/all2`);

    saveCountry = country => axios.post(`${API}/country-save`, country);

    getCountry = countryName => axios.get(`${API}/country-by-name/${countryName}`);
}
export default new CountryService();
