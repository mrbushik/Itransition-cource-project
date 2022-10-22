import { combineReducers } from 'redux';
import theme from './theme';
import changeCurrentPage from './currentPaginatePage';
import selectedTagSearch from './selectedTag';
import filter from './filter';
import userCollection from './userCollection';
const rootReducer = combineReducers({
  theme,
  changeCurrentPage,
  selectedTagSearch,
  filter,
  userCollection,
});
export default rootReducer;
