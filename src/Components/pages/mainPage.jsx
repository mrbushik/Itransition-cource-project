import React, { useState, useEffect } from 'react';
import NavBar from '../navigation/navBar';
import UserCollection from '../ui/userCollection';
import Modal from '../common/modal/collectionModal/modal';
import EditModal from '../../Components/common/modal/collectionModal/editModal';
import EditButtons from '../common/editButtons';

import { getUserCollection } from '../services/getInfoRequests';

function MainPage() {
  const URL = 'http://localhost:5000/api//all-collections?limit=100';
  const userRole = localStorage.getItem('role');
  const [collections, setCollections] = useState();
  const [activeModal, setActiveModal] = useState('');

  useEffect(() => {
    getUserCollection(URL, setCollections);
  }, []);
  const toggleActiveModal = (value) => setActiveModal(value);
  const updateCollections = () => getUserCollection(URL, setCollections);
  return (
    <>
      <NavBar />
      {userRole === 'ADMIN' && (
        <div>
          <EditButtons onToggle={toggleActiveModal} btnList={['Edit', 'Delete']} />

          {/* передать ID коллекции в пропс */}
          {activeModal === 'Edit' && collections && (
            <EditModal collections={collections} modalType={'Edit'} onActive={toggleActiveModal} />
          )}
          {activeModal === 'Delete' && collections && (
            <EditModal
              collections={collections}
              onActive={toggleActiveModal}
              modalType={'Delete'}
            />
          )}
        </div>
      )}
      <div className="d-flex justify-content-center flex-wrap w-100 mt-4">
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

export default MainPage;
