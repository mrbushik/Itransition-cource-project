import axios from 'axios';

export function editCollectionRequest(url, data, updateCollectionsData, token) {
  axios
    .patch(url, data, token)
    .then((response) => updateCollectionsData())
    .catch((error) => {
      console.log(error);
    });
}
export function addPost(url, data, onUpdateData, token) {
  axios
    .post(url, data, token)
    .then((response) => onUpdateData())
    .catch((error) => {
      console.log(error);
    });
}
export function editPostRequest(url, data, onUpdateData, token) {
  axios
    .patch(url, data, token)
    .then((response) => onUpdateData())
    .catch((error) => {
      console.log(error);
    });
}
export function modalDelete(url, onUpdateData, token) {
  axios
    .delete(url, token)
    .then((response) => onUpdateData())
    .catch((error) => {
      console.log(error);
    });
}

export function modalDeleteInOwner(url, targetId, token) {
  axios
    .patch(url, { id: targetId }, token)
    .then((response) => response)
    .catch((error) => {
      console.log(error);
    });
}

export async function uploadFile(e, setPhotoUrl) {
  const data = new FormData();
  data.append('file', e.target.files[0]);
  data.append('upload_preset', 'bushik123');
  const res = await fetch('	https://api.cloudinary.com/v1_1/drfjcq9hg/image/upload', {
    method: 'POST',
    body: data,
  });

  const file = await res.json();
  setPhotoUrl({ name: 'photoUrl', value: file.secure_url });
}
