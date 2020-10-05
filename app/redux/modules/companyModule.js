import { fromJS } from 'immutable';
import { ADDCOMPANY, GETCOMPANY } from '../constants/companyConstants';

const initialState = {
  company: {}
};
const initialImmutableState = fromJS(initialState);
export default function reducer(state = initialImmutableState, action = {}) {
  switch (action.type) {
    case ADDCOMPANY:
      return state.withMutations(mutableState => {
        mutableState.set('company', action.client);
      });
    case GETCOMPANY:
      return state;
    default:
      return state;
  }
}
