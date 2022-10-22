import { collectionsTags } from "../actions/userCollection";

const initialState = {
  collection: [],
  lagestCollection: '',
  lastPostCollection: '',
  collectionsTags: '',
  collectionsByTag: '',
};
// const userCollection = (state = initialState, action) => {
//   if (action.type === 'CHANGE_COLLECTION') {
//     return {
//       collection: action.payload,
//     };
//   }
//   return state;
// };

const userCollection = (state = initialState, action) => {
  switch (action.type) {
    case 'CHANGE_COLLECTION':
      return {
        ...state,
        collection: action.payload,
      };
    case 'LAGEST_COLLECTION':
      return {
        ...state,
        lagestCollection: action.payload,
      };
    case 'LAST_POST_COLLECTION':
      return {
        ...state,
        lastPostCollection: action.payload,
      };
      case 'COLLECTIONS_TAGS':
      return{
        ...state,
        collectionsTags: action.payload
      }
      case 'COLECTIONS_BY_TAGS':
        return{
            ...state,
            collectionsByTag: action.payload
        }
    default:
      return state;
  }
};

export default userCollection;
