const initialState = {
  language: 'en',
};
const language = (state = initialState, action) => {
  if (action.type === 'CHANGE_LANGUAGE') {
    return {
      ...state,
      language: action.payload,
    };
  }
  return state;
};

export default language;
