/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';

import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';
import EditButtons from '../common/editButtons';
import EditItemsModal from '../common/modal/ItemsModal/editItemsModal';
import CreateItemsModal from '../common/modal/ItemsModal/createItemsModal';
import NavBar from '../navigation/navBar';
import PostItem from '../ui/postItem';

function CollectionPage() {
  const params = useParams();
  const history = useHistory();
  let postsTemplate;
  const [collectionData, setCollectionData] = useState();
  const [activeModal, setActiveModal] = useState('');
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/collection/${params.Id}`)
      // .get(`http://localhost:5000/api/collection/633828a8bc8cbff8d3a0f1bd`)
      .then((response) => response)
      .then((data) => setCollectionData(data.data))
      .catch((error) => console.log(error));
  }, []);
  const goBack = () => history.goBack();
  if (collectionData) {
    postsTemplate = Object.values(collectionData.postsTemplate);
  }
  const toggleActiveModal = (value) => setActiveModal(value);

  return (
    <>
      <NavBar />
      <button className="btn btn-secondary ms-3 mt-3" onClick={goBack}>
        Back
      </button>
      <EditButtons onToggle={toggleActiveModal} btnList={['Create', 'Edit', 'Delete']} />

      {activeModal === 'Create' && collectionData && (
        // предусмотреть что дополнительных полей нет
        <CreateItemsModal
          fieldsCount={collectionData.postsTemplate.length - 2}
          // можно оптимизировать закинув имя мэпиться
          addingFields={collectionData.postsTemplate.slice(2, collectionData.length)}
          collectionId={params}
          onClose={toggleActiveModal}
        />
      )}
      {activeModal === 'Edit' && collectionData && (
        <EditItemsModal
          posts={collectionData.posts}
          postsTemplates={collectionData.postsTemplate.slice(
            1,
            collectionData.postsTemplate.length,
          )}
          onClose={toggleActiveModal}
          fieldsCount={collectionData.postsTemplate.length - 1}
          modalType={'Edit'}
        />
      )}
      {activeModal === 'Delete' && collectionData && (
        <EditItemsModal
          posts={collectionData.posts}
          postsTemplates={collectionData.postsTemplate.slice(
            1,
            collectionData.postsTemplate.length,
          )}
          onClose={toggleActiveModal}
          fieldsCount={collectionData.postsTemplate.length - 1}
          modalType={'Delete'}
        />
      )}
      {collectionData && (
        <>
          <h2 className="text-center mt-3">{collectionData.name}</h2>
          <table className="table mt-4">
            <thead>
              <tr>
                <th scope="col" onClick={goBack}>
                  id
                </th>
                {collectionData &&
                  postsTemplate.map((item, index) => <th key={index}>{item.description}</th>)}
              </tr>
            </thead>
            <tbody>
              {collectionData &&
                // можно сделать отдельным компонентом
                collectionData.posts.map((itemPosts, index) => (
                  <PostItem
                    id={itemPosts._id}
                    tags={itemPosts.tags}
                    otherFields={itemPosts.fields}
                  />
                ))}
            </tbody>
          </table>
        </>
      )}
    </>
  );
}

export default CollectionPage;
