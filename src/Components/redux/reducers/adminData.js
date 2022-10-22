const initialState = {
  users: '',
  collections: '',
};

const adminData = (state = initialState, action) => {
  switch (action.type) {
    case 'ALL_USERS':
      return {
        ...state,
        users: action.payload,
      };
    case 'ADMIN_COLLECTIONS':
      return {
        ...state,
        collections: action.payload,
      };

    default:
      return state;
  }
};

export default adminData;
