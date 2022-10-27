import axios from 'axios';
export function getPosts(url, setCollectionData) {
  axios
    .get(url)
    .then((data) => setCollectionData(data.data))
    .catch((error) => console.log(error));
}

export async function getTagCollectonsTotal(url, data, setCollectionsLength) {
  await axios
    .post(url, data)
    .then((data) => {
      setCollectionsLength(data.data.total);
    })
    .catch((error) => {
      console.log(error);
    });
}

export async function getCollectionComments(url, setCollections) {
  await axios
    .get(url)
    .then((data) => {
      setCollections(data.data);
    })
    .catch((error) => {
      console.log(error);
    });
}
export async function fullTextSearch(url, data, setCollections) {
  await axios
    .post(url, { searchText: data })
    .then((data) => {
      setCollections(data.data);
    })
    .catch((error) => {
      console.log(error);
    });
}
