/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';

import UserCollection from '../ui/userCollection';
import Modal from '../common/modal/collectionModal/modal';
import EditModal from '../../Components/common/modal/collectionModal/editModal';
import EditButtons from '../common/editButtons';
import NavBar from '../navigation/navBar';

import { getUserCollection, getUserPages } from '../services/getInfoRequests';
import Paginate from '../common/paginate';
function UserPage() {
  const [collections, setCollections] = useState();
  const [activeModal, setActiveModal] = useState('');
  const [countCollections, setTotalCollections] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const userId = localStorage.getItem('userId');
  const URL = `http://localhost:5000/api/user/${userId} `;
  // const URL = `http://localhost:5000/api/user/63356ff4ed30ed38a56c14f8 `;

  const toggleActiveModal = (value) => setActiveModal(value);
  const updateCollections = () => getUserCollection(URL, setCollections);
  const getCollectionsPages = (count) => setCurrentPage(count);
  useEffect(() => {
    getUserCollection(URL, setCollections);
    // getUserPages(URL, setTotalCollections);
  }, []);
  useEffect(() => {
    getUserCollection(URL, setCollections);
  }, [currentPage]);

  return (
    <>
      <NavBar />
      <EditButtons onToggle={toggleActiveModal} btnList={['Create', 'Edit', 'Delete']} />
      <div>
        {/* передать ID коллекции в пропс */}
        {activeModal === 'Create' && (
          <Modal onActive={toggleActiveModal} updateCollections={updateCollections} />
        )}
        {activeModal === 'Edit' && collections && (
          <EditModal collections={collections} modalType={'Edit'} onActive={toggleActiveModal} />
        )}
        {activeModal === 'Delete' && collections && (
          <EditModal collections={collections} onActive={toggleActiveModal} modalType={'Delete'} />
        )}
      </div>
      <div className="d-flex justify-content-center flex-wrap w-100 mt-4">
        {collections ? (
          collections.map((item, index) => (
            <UserCollection
              description={item.description}
              key={index}
              id={item._id}
              type={item.type}
              authorName={item.ownerName}
              icon={item.icon}
              name={item.name}
              collectionDescription={item.collectionDescription}
              {...item}
            />
          ))
        ) : (
          <div>you don't have collections</div>
        )}
      </div>
    </>
  );
}

export default UserPage;
