import axios from 'axios';
import { API } from '../../config/apiUrl';

class PeopleService {
  getPeoples = () => axios.get(`${API}/people-all`);

  savePeople = (people) => axios.post(`${API}/people-add`, people);

  getPeopleByCountry = (countryId) => axios.get(`${API}/people-country/${countryId}`);
}
export default new PeopleService();
