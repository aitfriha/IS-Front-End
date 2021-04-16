import axios from 'axios';
import { API } from '../../config/apiUrl';

class CommercialActionService {
    getCommercialAction = () => axios.get(`${API}/commercialAction/all`);

    getCommercialActionById = Id => axios.post(`${API}/commercialAction/row/${Id}`);

    saveCommercialAction = CommercialAction => axios.post(`${API}/commercialAction/add`, CommercialAction);

    updateCommercialAction = CommercialAction => axios.post(`${API}/commercialAction/update`, CommercialAction);

    deleteCommercialAction = Id => axios.post(`${API}/commercialAction/delete/${Id}`);
}
export default new CommercialActionService();
