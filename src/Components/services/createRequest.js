import axios from 'axios';
export async function createCollection(url, data, updateCollections) {
  await axios
    .post(url, data)
    .then((response) => response)
    .then((response) => updateCollections())
    .catch((error) => {
      console.log(error);
    });
}
export async function writeCommentRequest(url, data, getCollectionComments) {
  await axios
    .post(url, data)
    .then((response) => getCollectionComments())
    .catch((error) => {
      console.log(error);
    });
}
