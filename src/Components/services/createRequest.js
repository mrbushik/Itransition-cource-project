import axios from 'axios';
export async function createCollection(url, data, updateCollections) {
  await axios
    .post(url, data)
    .then((response) => response)
    .then((data) => updateCollections())
    .catch((error) => {
      //   setRequestStatus(error.response.data);
    });
}
