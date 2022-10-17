import axios from 'axios';
export function editCollectionRequest(url, data, updateCollectionsData) {
  axios
    .patch(url, data)
    .then((response) => response)
    .then((response) => updateCollectionsData())
    .catch((error) => {
      console.log(error);
    });
}
export function addPost(data, onUpdateData) {
  axios
    .post('http://localhost:5000/api/add-posts', data)
    .then((response) => response)
    .then((response) => onUpdateData())
    .catch((error) => {
      console.log(error);
    });
}
export function editPostRequest(url, data, onUpdateData) {
  axios
    .patch(url, data)
    .then((response) => response)
    .then((response) => onUpdateData())
    .catch((error) => {
      console.log(error);
    });
}
export function modalDelete(url, onUpdateData) {
  axios
    .delete(url)
    .then((response) => response)
    .then((response) => onUpdateData())
    .catch((error) => {
      console.log(error);
    });
}

export function modalDeleteInOwner(url, targetId) {
  axios
    .patch(url, { id: targetId })
    .then((response) => response)
    .catch((error) => {
      console.log(error);
    });
}

export function deleteAllPosts(url) {
  axios
    .delete(url)
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
