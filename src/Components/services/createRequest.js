import axios from 'axios';
export async function createCollection(url, data, updateCollections, token) {
  await axios
    .post(url, data, token)
    .then((response) => updateCollections())
    .catch((error) => {
      console.log(error);
    });
}
export async function writeCommentRequest(url, data, getCollectionComments, token) {
  await axios
    .post(url, data, token)
    .then((response) => getCollectionComments())
    .catch((error) => {
      console.log(error);
    });
}
