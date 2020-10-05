import axios from 'axios';
import { API } from '../../config/apiUrl';

class AddressService {
    getClientAddresses = (clientId) => axios.get(`${API}/client/address/${clientId}`);

    saveAddress = address => axios.post(`${API}/address`, address);

    updateAddress = (address, addressId) => axios.put(`${API}/address-update/${addressId}`, address);

    deleteAlgorithm = algorithmId => axios.delete(`${API}/algorithm/delete/${algorithmId}`);
}
export default new AddressService();
