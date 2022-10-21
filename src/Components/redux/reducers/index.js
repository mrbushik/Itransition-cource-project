import { combineReducers } from 'redux';
import theme from './theme';
import changeCurrentPage from './currentPaginatePage';
import selectedTagSearch from './selectedTag';
import filter from './filter';
const rootReducer = combineReducers({
  theme,
  changeCurrentPage,
  selectedTagSearch,
  filter,
});
export default rootReducer;
