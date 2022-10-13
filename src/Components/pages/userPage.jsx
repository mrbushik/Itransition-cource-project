/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { getUserCollection } from '../services/getInfoRequests';
import { paginate } from '../utils/paginate';

import UserCollection from '../ui/userCollection';
import Modal from '../common/modal/collectionModal/modal';
import EditModal from '../../Components/common/modal/collectionModal/editModal';
import EditButtons from '../common/buttons/editButtons';
import NavBar from '../navigation/navBar';
import Paginate from '../common/paginate';

import { useDispatch, useSelector } from 'react-redux';
import { changeCurrentPageAtUser } from '../redux/actions/currentPaginatePage';

function UserPage() {
  const userId = localStorage.getItem('userId');
  const URL = `http://localhost:5000/api/user/${userId} `;
  let userCrop;
  const { t } = useTranslation();
  const history = useHistory();
  const dispatch = useDispatch();

  const [collections, setCollections] = useState();
  const [activeModal, setActiveModal] = useState('');
  const currentPage = useSelector(({ changeCurrentPage }) => changeCurrentPage.userPage);
  const [countPage, setCountPage] = useState(1);

  const toggleActiveModal = (value) => setActiveModal(value);

  const updateCollectionsData = () => getUserCollection(URL, setCollections);

  useEffect(() => {
    if (!userId) {
      history.push('/');
    }
  }, []);

  useEffect(() => {
    getUserCollection(URL, setCollections);
  }, []);

  const changePage = (count) => dispatch(changeCurrentPageAtUser(count));

  useEffect(() => {
    setCountPage(currentPage);
  }, [currentPage]);
  if (collections) {
    userCrop = paginate(collections, currentPage, 3);
  }
  return (
    <>
      <NavBar />
      <div></div>
      <EditButtons
        onToggle={toggleActiveModal}
        btnList={collections ? [t('create'), t('edit'), t('delete')] : [t('create')]}
      />
      <div>
        {activeModal === t('create') && (
          <Modal onActive={toggleActiveModal} updateCollectionsData={updateCollectionsData} />
        )}
        {activeModal === t('edit') && collections && (
          <EditModal
            collections={collections}
            updateCollectionsData={updateCollectionsData}
            modalType={t('edit')}
            onActive={toggleActiveModal}
          />
        )}
        {activeModal === t('delete') && collections && (
          <EditModal
            updateCollectionsData={updateCollectionsData}
            collections={collections}
            onActive={toggleActiveModal}
            modalType={t('delete')}
          />
        )}
      </div>
      <div className="mx-auto" style={{ width: '250px' }}>
        {collections ? (
          userCrop.map((item, index) => (
            <UserCollection
              link={'collection/'}
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
          onPageChange={changePage}
        />
      )}
    </>
  );
}

export default UserPage;
