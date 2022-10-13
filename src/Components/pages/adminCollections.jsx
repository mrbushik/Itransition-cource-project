/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUserCollection, getUserPages } from '../services/getInfoRequests';
import { changeCurrentPage } from '../redux/actions/currentPaginatePage';
import { useTranslation } from 'react-i18next';

import UserCollection from '../ui/userCollection';
import Paginate from '../common/paginate';
import NavBar from '../navigation/navBar';
import EditButtons from '../common/buttons/editButtons';
import EditModal from '../common/modal/collectionModal/editModal';

function AdminCollections() {
  const role = localStorage.getItem('role');
  const history = useHistory();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const currentPage = useSelector(({ changeCurrentPage }) => changeCurrentPage.page);
  const getCollectionsURL = `http://localhost:5000/api//all-collections?page=${currentPage}`;

  const [collections, setCollections] = useState();
  const [countCollections, setTotalCollections] = useState();
  const [countPage, setCountPage] = useState(1);
  const [activeModal, setActiveModal] = useState('');

  useEffect(() => {
    if (role !== 'ADMIN') {
      history.push('/');
    }
  }, []);
  useEffect(() => {
    getUserCollection(getCollectionsURL, setCollections);
    getUserPages(getCollectionsURL, setTotalCollections);
  }, []);

  const getCollectionsPages = (count) => {
    dispatch(changeCurrentPage(count));
  };

  useEffect(() => {
    setCountPage(currentPage);
    getUserCollection(getCollectionsURL, setCollections);
  }, [currentPage]);

  const toggleActiveModal = (value) => setActiveModal(value);

  const handleUpdateData = () => getUserCollection(getCollectionsURL, setCollections);
  return (
    <>
      <NavBar />
      <div>
        <div className="d-flex justify-content-between flex-wrap">
          {role === 'ADMIN' && (
            <div>
              {role && (
                <EditButtons onToggle={toggleActiveModal} btnList={[t('edit'), t('delete')]} />
              )}
              {activeModal === t('edit') && collections && (
                <EditModal
                  collections={collections}
                  modalType={t('edit')}
                  onActive={toggleActiveModal}
                  updateCollectionsData={handleUpdateData}
                />
              )}
              {activeModal === t('delete') && collections && (
                <EditModal
                  collections={collections}
                  onActive={toggleActiveModal}
                  modalType={t('delete')}
                  updateCollectionsData={handleUpdateData}
                />
              )}
            </div>
          )}
          <div className="m-4">
            <Link to="admin-panel">
              <div className="btn btn-secondary  ">{t('to admin panel')}</div>
            </Link>
          </div>
        </div>
        {collections
          ? collections.map((item, index) => (
              <UserCollection
                link={'/'}
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
          : ''}
      </div>
      <Paginate
        countCollections={countCollections}
        currentPage={currentPage}
        onPageChange={getCollectionsPages}
      />
    </>
  );
}

export default AdminCollections;