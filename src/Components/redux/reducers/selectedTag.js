const initialState = {
  selectedTagSearch: '',
};
const selectedTagSearch = (state = initialState, action) => {
  if (action.type === 'CHANGE_SELECTED_TAG_SEARCH') {
    return {
      selectedTagSearch: action.payload,
    };
  }
  return state;
};

export default selectedTagSearch;
