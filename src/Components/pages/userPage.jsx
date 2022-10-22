/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
// import { getUserCollection } from '../services/getInfoRequests';
import { paginate } from '../utils/paginate';

import UserCollection from '../ui/userCollection';
import Modal from '../common/modal/collectionModal/modal';
import EditModal from '../../Components/common/modal/collectionModal/editModal';
import EditButtons from '../common/buttons/editButtons';
import NavBar from '../navigation/navBar';
import Paginate from '../common/paginate';

import { useDispatch, useSelector } from 'react-redux';
import { changeCurrentPageAtUser } from '../redux/actions/currentPaginatePage';
import { getCollections } from '../redux/actions/userCollection';
import Filter from '../ui/filter';

function UserPage() {
  const userId = localStorage.getItem('userId');

  let croppedCollection;
  const { t } = useTranslation();
  const history = useHistory();
  const dispatch = useDispatch();

  const [collections, setCollections] = useState([]);
  const [activeModal, setActiveModal] = useState('');
  const currentPage = useSelector(({ changeCurrentPage }) => changeCurrentPage.userPage);
  const userCollection = useSelector(({ userCollection }) => userCollection.collection);
  const filterParams = useSelector(({ filter }) => filter.filterValue);
  const [countPage, setCountPage] = useState(1);
  const URL = `http://localhost:5000/api/user/${userId}/?filter=${filterParams} `;

  const toggleActiveModal = (value) => setActiveModal(+value);

  const updateCollectionsData = (link) => dispatch(getCollections(link ? link : URL));

  useEffect(() => {
    if (!userId) {
      history.push('/');
    }
  }, []);

  useEffect(() => {
    dispatch(getCollections(URL));
  }, []);

  useEffect(() => {
    if (Math.ceil(userCollection.length / 3) < currentPage) {
      dispatch(changeCurrentPageAtUser(1));
      dispatch(getCollections(URL));
    }
  }, [userCollection]);

  const changePage = (count) => dispatch(changeCurrentPageAtUser(count));

  useEffect(() => {
    setCountPage(currentPage);
  }, [currentPage]);
  if (userCollection) {
    croppedCollection = paginate(userCollection, currentPage, 3);
  }
  return (
    <>
      <NavBar />
      <EditButtons
        onToggle={toggleActiveModal}
        btnList={
          userCollection.length !== 0 ? [t('create'), t('edit'), t('delete')] : [t('create')]
        }
      />
      <div>
        {activeModal === 0 && (
          <Modal onActive={toggleActiveModal} updateCollectionsData={updateCollectionsData} />
        )}
        {activeModal === 1 && croppedCollection && (
          <EditModal
            collections={croppedCollection}
            updateCollectionsData={updateCollectionsData}
            modalType={t('edit')}
            onActive={toggleActiveModal}
          />
        )}
        {activeModal === 2 && croppedCollection && (
          <EditModal
            updateCollectionsData={updateCollectionsData}
            collections={croppedCollection}
            onActive={toggleActiveModal}
            modalType={t('delete')}
          />
        )}
      </div>

      {userCollection && userCollection.length !== 0 && (
        <Filter
          options={[t('new'), t('old')]}
          filterValues={['new', 'old']}
          userId={userId}
          // setCollections={setCollections}
          onUpdate={updateCollectionsData}
        />
      )}
      {userCollection && (
        <div>
          <div className="mx-auto mt-4" style={{ width: '250px' }}>
            {userCollection ? (
              croppedCollection.map((item, index) => (
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
          {userCollection && (
            <Paginate
              countCollections={userCollection.length}
              currentPage={currentPage}
              onPageChange={changePage}
            />
          )}
        </div>
      )}
      {userCollection && userCollection.length === 0 && (
        <div className="text-danger  mt-4 fs-5  text-center px-3">{t('none collections')}</div>
      )}
    </>
  );
}

export default UserPage;
