const initialState = {
  selectedTagSearch: '',
  allTags: [],
};

const selectedTagSearch = (state = initialState, action) => {
  switch (action.type) {
    case 'CHANGE_SELECTED_TAG_SEARCH':
      return {
        ...state,
        selectedTagSearch: action.payload,
      };
    case 'ALL_TAGS':
      return {
        ...state,
        allTags: action.payload,
      };
    default:
      return state;
  }
};

export default selectedTagSearch;
