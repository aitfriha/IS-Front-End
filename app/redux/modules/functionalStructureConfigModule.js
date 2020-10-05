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
        console.log('redux');
        console.log(action.levelConfig);
        console.log(state);
        const levelsConfigArray = state.toJS().levelsConfig;
        console.log(levelsConfigArray);
        levelsConfigArray.push(action.levelConfig);
        console.log(levelsConfigArray);
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
