const initialState = {
  filter: 'new',
  filterValue: 'new',
};
const filter = (state = initialState, action) => {
  switch (action.type) {
    case 'CHANGE_FILTER':
      return {
        ...state,
        filter: action.payload,
      };
    case 'CHANGE_FILTER_VALUE':
      return {
        ...state,
        filterValue: action.payload,
      };

    default:
      return state;
  }
};

export default filter;
