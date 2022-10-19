import axios from 'axios';
const token = localStorage.getItem('token');
const config = {
  headers: { Authorization: 'Bearer ' + token },
};
export async function createCollection(url, data, updateCollections) {
  await axios
    .post(url, data, config)
    .then((response) => updateCollections())
    .catch((error) => {
      console.log(error);
    });
}
export async function writeCommentRequest(url, data, getCollectionComments) {
  await axios
    .post(url, data, config)
    .then((response) => getCollectionComments())
    .catch((error) => {
      console.log(error);
    });
}
