import axios from 'axios';
import { API } from '../../config/apiUrl';

class ClientService {
    getClients = () => axios.get(`${API}/client/all`);

    saveClient = client => axios.post(`${API}/client`, client);

    getClientsByCountry = country => axios.get(`${API}/client/clients-by-country/${country}`);

    getClientsByCode = code => axios.get(`${API}/client/clients-by-code/${code}`);

    deleteAlgorithm = algorithmId => axios.delete(`${API}/algorithm/delete/${algorithmId}`);
}
export default new ClientService();
