import axios from 'axios';

export const selectedTagSearch = (theme) => ({
  type: 'CHANGE_SELECTED_TAG_SEARCH',
  payload: theme,
});
export const allTags = (theme) => ({
  type: 'ALL_TAGS',
  payload: theme,
});

export const getAllTags = (url) => (dispatch) => {
  axios
    .get(url)
    .then((data) => dispatch(allTags(data.data)))
    .catch((error) => {
      console.log(error);
    });
};
