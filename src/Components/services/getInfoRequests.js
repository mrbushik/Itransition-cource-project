import axios from 'axios';

const token = localStorage.getItem('token');
const config = {
  headers: { Authorization: 'Bearer ' + token },
};

export function getUserCollection(url, setCollections) {
  axios
    .get(url, config)

    .then((response) => response)
    .then((response) =>
      response.data.collections.length === 0
        ? setCollections('')
        : setCollections(response.data.collections),
    )
    .catch((error) => console.log(error));
}

export function getPosts(setCollectionData, params) {
  axios
    .get(`http://localhost:5000/api/collection/${params.Id}`)
    .then((data) => setCollectionData(data.data))
    .catch((error) => console.log(error));
}

export function getNewPosts(url, setNewPosts) {
  axios
    .get(url)
    .then((data) => setNewPosts(data.data))
    .catch((error) => console.log(error));
}

export function getLagestCollections(url, setCollection) {
  axios
    .get(url)
    .then((data) => setCollection(data.data))
    .catch((error) => {
      console.log(error);
    });
}

export function getAllTags(url, getTargetData, setSuggestions) {
  axios
    .get(url)
    .then((data) => getTargetData(data.data))
    .then((data) => setSuggestions(data))
    .catch((error) => {
      console.log(error);
    });
}
export function getTags(url, setTags) {
  axios
    .get(url)
    .then((data) => setTags(data.data))
    .catch((error) => {
      console.log(error);
    });
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

export async function getCollectonsByTag(url, data, setCollections, setCollectionsLength) {
  await axios
    .post(url, data)
    .then((data) => {
      setCollections(data.data.collections);
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
export async function fullTextSearch(url, data) {
  await axios
    .post(url, data)
    // .then((data) => {
    //   setCollections(data.data);
    // })
    .catch((error) => {
      console.log(error);
    });
}
