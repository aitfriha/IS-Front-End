import { fromJS } from 'immutable';
import { ADDSECTORCONFIG, GETSECTORCONFIG, SETSECTORCONFIG } from '../constants/sectorConfigModule';

const initialState = {
  sectorsConfig: []
};
const initialImmutableState = fromJS(initialState);
export default function reducer(state = initialImmutableState, action = {}) {
  switch (action.type) {
    case ADDSECTORCONFIG:
      return state.withMutations(mutableState => {
        const sectorsConfigArray = state.get('sectorsConfig');
        sectorsConfigArray.push(action.sectorConfig);
        mutableState.set('sectorsConfig', sectorsConfigArray);
      });
    case SETSECTORCONFIG:
      return state.withMutations(mutableState => {
        mutableState.set('sectorsConfig', action.sectorsConfig);
      });
    case GETSECTORCONFIG:
      return state;
    default:
      return state;
  }
}
