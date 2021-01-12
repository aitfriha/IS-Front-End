import axios from 'axios';
import ENDPOINTS from '../../api/endpoints';

class SelectionTypeEvaluationService {
  getSelectionTypeByType = type => axios.get(`${ENDPOINTS.SELECTIONTYPEEVALUATION}/all-by-type/${type}`);
}
export default new SelectionTypeEvaluationService();
