const initialState = {
  users: '',
  collections: '',
  errors: '',
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
    case 'ADMIN_ERRORS':
      return {
        ...state,
        errors: action.payload,
      };

    default:
      return state;
  }
};

export default adminData;
