import { fromJS } from 'immutable';
import { ADDAREA, GETAREA } from '../constants/areaConstants';

const initialState = {
  area: {}
};
const initialImmutableState = fromJS(initialState);
export default function reducer(state = initialImmutableState, action = {}) {
  switch (action.type) {
    case ADDAREA:
      return state.withMutations(mutableState => {
        mutableState.set('area', action.client);
      });
    case GETAREA:
      return state;
    default:
      return state;
  }
}
