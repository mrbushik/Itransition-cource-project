const initialState = {
  filter: 'new',
};
const filter = (state = initialState, action) => {
  if (action.type === 'CHANGE_FILTER') {
    return {
      filter: action.payload,
    };
  }
  return state;
};

export default filter;
