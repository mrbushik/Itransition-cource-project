import axios from 'axios';
export function getUserCollection(url, setCollections) {
  axios
    .get(url)
    .then((response) => response)
    .then((data) => setCollections(data.data.collections))
    .catch((error) => {
      console.log(error);
    });
}
