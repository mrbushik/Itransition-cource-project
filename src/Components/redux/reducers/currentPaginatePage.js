const initialState = {
  page: 1,
  userPage: 1,
  tagPage: 1,
};
const changeCurrentPage = (state = initialState, action) => {
  if (action.type === 'CHANGE_CURRENT_PAGE') {
    return {
      ...state,
      page: action.payload,
    };
  } else if (action.type === 'CHANGE_CURRENT_USER_PAGE') {
    return {
      ...state,
      userPage: action.payload,
    };
  } else if (action.type === 'CHANGE_CURRENT_TAG_PAGE') {
    return {
      ...state,
      tagPage: action.payload,
    };
  }
  return state;
};

export default changeCurrentPage;
