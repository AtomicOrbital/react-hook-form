import { connectRouter, RouterState } from 'connected-react-router';
import { History } from 'history';
import { combineReducers } from 'redux';
import authReducer, { AuthState } from '../modules/auth/redux/authReducer';
import intlReducer, { IntlState } from '../modules/intl/redux/intlReducer';
import photoReducer, { PhotoState } from '../modules/intl/redux/Reducers/photoReducer';
import tableReducer from '../modules/intl/redux/Reducers/tableReducer';
import { DataItem } from '../modules/auth/components/ExerciseTable/TableComponent';

export interface AppState {
  router: RouterState;
  intl: IntlState;
  profile: AuthState;
  photoReducer: PhotoState; 
  tableReducer: DataItem
}


export default function createRootReducer(history: History) {
  return combineReducers({
    router: connectRouter(history),
    intl: intlReducer,
    profile: authReducer,
    photoReducer,
    tableReducer
  });
}
