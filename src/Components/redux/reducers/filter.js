const initialState = {
  filter: 'new',
  filterValue: 'new',
};
const filter = (state = initialState, action) => {
  if (action.type === 'CHANGE_FILTER') {
    return {
      ...state,
      filter: action.payload,
    };
  } else if (action.type === 'CHANGE_FILTER_VALUE') {
    return {
      ...state,
      filterValue: action.payload,
    };
  }
  return state;
};

export default filter;
