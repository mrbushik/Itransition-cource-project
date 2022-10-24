import axios from 'axios';

export async function putLikeRequest(url, data, checkLike, setErrors, token) {
  await axios
    .patch(url, { id: data }, token)
    .then((response) => checkLike())
    .catch((error) => {
      setErrors(error.response.data);
    });
}

export async function checkLikeRequest(url, data, setLike) {
  await axios
    .post(url, { id: data })
    .then((response) => setLike(response.data))
    .catch((error) => {
      console.log(error);
    });
}
