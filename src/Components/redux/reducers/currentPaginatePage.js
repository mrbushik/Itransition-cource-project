const initialState = {
  page: 1,
};
const changeCurrentPage = (state = initialState, action) => {
  if (action.type === 'CHANGE_CURREN_PAGE') {
    return {
      page: action.payload,
    };
  }
  return state;
};

export default changeCurrentPage;
