import React from 'react';
import axios from 'axios';
import UserCollection from '../ui/userCollection';
import Modal from '../modal/modal';
import EditModal from '../modal/editModal';
function UserPage() {
  const [collections, setCollections] = React.useState();
  const [activeModal, setActiveModal] = React.useState('');
  React.useEffect(() => {
    axios
      .get('http://localhost:5000/api/user/63356ff4ed30ed38a56c14f8')
      .then((response) => response)
      .then((data) => setCollections(data.data.collections));
  }, []);
  const toggleActiveModal = (value) => setActiveModal(value);
  return (
    <>
      <div className="m-3">
        <button
          type="button"
          className="btn btn-light ms-3"
          onClick={() => toggleActiveModal('create')}>
          Create
        </button>
        <button type="button" className="btn btn-light ms-3">
          Edit
        </button>
        <button type="button" className="btn btn-light ms-3">
          Delete
        </button>
      </div>

      <div className="d-flex">
        {/* {activeModal === 'create' && <Modal onActive={toggleActiveModal} />} */}
        {collections && <EditModal collections={collections} modalType={'Edit'} />}
        {collections
          ? collections.map((item, index) => (
              <UserCollection
                description={item.description}
                key={index}
                id={item._id}
                type={item.type}
                authorName={item.authorName}
                icon={item.icon}
                name={item.name}
                collectionDescription={item.collectionDescription}
                {...item}
              />
            ))
          : ''}
      </div>
    </>
  );
}

export default UserPage;
