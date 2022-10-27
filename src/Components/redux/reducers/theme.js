const themeMod = localStorage.getItem('theme');
const initialState = {
  theme: themeMod || 'ligth',
};

const theme = (state = initialState, action) => {
  if (action.type === 'CHANGE_THEME') {
    localStorage.setItem('theme', action);
    return {
      theme: action.payload,
    };
  }
  return state;
};

export default theme;
