import { fromJS } from 'immutable';
import { SET_STAFF, SET_EDIT } from './constants';

const initialState = {
  staff: {},
  isEdit: false
};

const initialImmutableState = fromJS(initialState);

export default function staffReducer(state = initialImmutableState, action) {
  switch (action.type) {
    case SET_STAFF:
      return state.withMutations(mutableState => {
        mutableState.set('staff', action.staff);
      });

    case SET_EDIT:
      return state.withMutations(mutableState => {
        mutableState.set('isEdit', action.isEdit);
      });

    default:
      return state;
  }
}
