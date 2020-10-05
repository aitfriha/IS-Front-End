import { fromJS } from 'immutable';
import { ADDSECTOR, GETSECTOR } from '../constants/sectorConstants';

const initialState = {
  sector: {}
};
const initialImmutableState = fromJS(initialState);
export default function reducer(state = initialImmutableState, action = {}) {
  switch (action.type) {
    case ADDSECTOR:
      return state.withMutations(mutableState => {
        mutableState.set('sector', action.client);
      });
    case GETSECTOR:
      return state;
    default:
      return state;
  }
}
