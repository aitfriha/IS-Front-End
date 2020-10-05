import axios from 'axios';

class ClientInfoService {
  getClientInfo = () => axios.get(`https://www.cloudflare.com/cdn-cgi/trace`);

}
export default new ClientInfoService();
