import { combineReducers } from 'redux';
import theme from './theme';
import changeCurrentPage from './currentPaginatePage';
const rootReducer = combineReducers({
  theme,
  changeCurrentPage,
});
export default rootReducer;
