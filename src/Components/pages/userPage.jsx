/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';

import UserCollection from '../ui/userCollection';
import Modal from '../common/modal/collectionModal/modal';
import EditModal from '../../Components/common/modal/collectionModal/editModal';
import EditButtons from '../common/editButtons';
import NavBar from '../navigation/navBar';
import Paginate from '../common/paginate';
import { useTranslation } from 'react-i18next';

import { getUserCollection } from '../services/getInfoRequests';
import { paginate } from '../utils/paginate';
// import { useSelector } from 'react-redux';
function UserPage() {
  const [collections, setCollections] = useState();
  const [activeModal, setActiveModal] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  // const language = useSelector(({ language }) => language);
  // console.log(language);

  const userId = localStorage.getItem('userId');
  const URL = `http://localhost:5000/api/user/${userId} `;
  let userCrop;
  const { t } = useTranslation();

  const toggleActiveModal = (value) => setActiveModal(value);
  const updateCollections = () => getUserCollection(URL, setCollections);

  useEffect(() => {
    getUserCollection(URL, setCollections);
  }, []);

  const getCollectionsPages = (count) => setCurrentPage(count);

  if (collections) {
    userCrop = paginate(collections, currentPage, 3);
  }
  return (
    <>
      <NavBar />
      <div></div>
      <EditButtons onToggle={toggleActiveModal} btnList={[t('create'), t('edit'), t('delete')]} />
      <div>
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
      <div className="mx-auto" style={{ width: '250px' }}>
        {collections ? (
          userCrop.map((item, index) => (
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
          <div> {t("haven't collections")}</div>
        )}
      </div>
      {collections && (
        <Paginate
          countCollections={collections.length}
          currentPage={currentPage}
          onPageChange={getCollectionsPages}
        />
      )}
    </>
  );
}

export default UserPage;
