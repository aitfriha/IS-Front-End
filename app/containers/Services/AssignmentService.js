import axios from 'axios';
import { API } from '../../config/apiUrl';

class AssignmentService {
    getAssignments = () => axios.get(`${API}/assignment/all`);

    getClientAssignment = (clientId) => axios.get(`${API}/client/assignment/${clientId}`);

    saveAssignment = assignment => axios.post(`${API}/assignment`, assignment);

    getAssignmentByPeople= peopleId => axios.get(`${API}/client/assignment/people/${peopleId}`);
}
export default new AssignmentService();
