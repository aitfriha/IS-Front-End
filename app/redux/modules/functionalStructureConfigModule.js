import { fromJS } from 'immutable';
import {
  ADDLEVELCONFIG,
  GETLEVELCONFIG,
  SETLEVELCONFIG
} from '../constants/functionaStructureConfigModule';

const initialState = {
  levelsConfig: []
};
const initialImmutableState = fromJS(initialState);
export default function reducer(state = initialImmutableState, action = {}) {
  switch (action.type) {
    case ADDLEVELCONFIG:
      return state.withMutations(mutableState => {
        const levelsConfigArray = state.toJS().levelsConfig;
        levelsConfigArray.push(action.levelConfig);
        mutableState.set('levelsConfig', levelsConfigArray);
      });
    case SETLEVELCONFIG:
      return state.withMutations(mutableState => {
        mutableState.set('levelsConfig', action.levelsConfig);
      });
    case GETLEVELCONFIG:
      return state;
    default:
      return state;
  }
}
