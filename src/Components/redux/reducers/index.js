import { combineReducers } from 'redux';
import theme from './theme';
import changeCurrentPage from './currentPaginatePage';
import selectedTagSearch from './selectedTag';
import filter from './filter';
import userCollection from './userCollection';
import adminData from './adminData';

const rootReducer = combineReducers({
  theme,
  changeCurrentPage,
  selectedTagSearch,
  filter,
  userCollection,
  adminData,
});

export default rootReducer;
