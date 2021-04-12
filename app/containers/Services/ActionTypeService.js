import axios from 'axios';
import { API } from '../../config/apiUrl';

class ActionTypeService {
    getActionType = () => axios.get(`${API}/commercialActionType/all`);

    getActionTypeById = Id => axios.post(`${API}/commercialActionType/row/${Id}`);

    saveActionType = ActionType => axios.post(`${API}/commercialActionType/add`, ActionType);

    updateActionType = ActionType => axios.post(`${API}/commercialActionType/update`, ActionType);

    deleteActionType = Id => axios.post(`${API}/commercialActionType/delete/${Id}`);
}
export default new ActionTypeService();
