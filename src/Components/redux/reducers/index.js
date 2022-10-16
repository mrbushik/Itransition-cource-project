import { combineReducers } from 'redux';
import theme from './theme';
import changeCurrentPage from './currentPaginatePage';
import selectedTagSearch from './selectedTag';
const rootReducer = combineReducers({
  theme,
  changeCurrentPage,
  selectedTagSearch,
});
export default rootReducer;
