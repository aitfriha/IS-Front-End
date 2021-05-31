import { Map, fromJS } from 'immutable';
import { INIT } from '../constants/reduxFormConstants';

const initialState = {
  usersLogin: Map({
    email: 'aitfriha.zaid@gmail.com',
    password: '7585677',
    remember: false
  })
};
const initialImmutableState = fromJS(initialState);
export default function reducer(state = initialImmutableState, action = {}) {
  switch (action.type) {
    case INIT:
      return state;
    default:
      return state;
  }
}
