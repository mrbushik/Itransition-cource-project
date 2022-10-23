/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAdminCollections } from '../redux/actions/adminData';
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
  const adminCollections = useSelector(({ adminData }) => adminData.collections);

  const [page, setCurrentPage] = useState(1);
  const [activeModal, setActiveModal] = useState('');
  const getCollectionsURL = `${process.env.REACT_APP_DOMAIN_NAME}/api//all-collections?page=${currentPage}`;

  const handleUpdateData = (url) => {
    dispatch(getAdminCollections(url ? url : getCollectionsURL));
  };

  useEffect(() => {
    if (role !== 'ADMIN') history.push('/');
  }, []);

  useEffect(() => {
    if (Math.ceil(adminCollections.total / 3) < adminCollections.page) {
      dispatch(changeCurrentPage(1));
      handleUpdateData(`${process.env.REACT_APP_DOMAIN_NAME}/api//all-collections?page=1`);
    }
  }, [adminCollections]);

  const getCollectionsPages = (count) => {
    dispatch(changeCurrentPage(count));
  };

  useEffect(() => {
    setCurrentPage(currentPage);
    dispatch(getAdminCollections(getCollectionsURL));
  }, [currentPage]);

  const toggleActiveModal = (value) => setActiveModal(+value);
  return (
    <>
      <NavBar />
      {adminCollections && adminCollections.collections.length > 0 ? (
        <div>
          <div>
            <div className="d-flex justify-content-between flex-wrap">
              {role === 'ADMIN' && (
                <div>
                  <div>
                    {role && adminCollections.collections.length !== 0 && (
                      <EditButtons
                        onToggle={toggleActiveModal}
                        btnList={[t('edit'), t('delete')]}
                      />
                    )}
                  </div>
                </div>
              )}
              <div className="m-4">
                <Link to="admin-panel">
                  <div className="btn btn-secondary">{t('to admin panel')}</div>
                </Link>
              </div>
            </div>
            {activeModal === 0 && adminCollections.collections && (
              <EditModal
                collections={adminCollections.collections}
                modalType={t('edit')}
                onActive={toggleActiveModal}
                updateCollectionsData={handleUpdateData}
              />
            )}
            {activeModal === 1 && adminCollections.collections && (
              <EditModal
                collections={adminCollections.collections}
                onActive={toggleActiveModal}
                modalType={t('delete')}
                updateCollectionsData={handleUpdateData}
              />
            )}
            <div className="mt-4 d-flex justify-content-center flex-wrap">
              {adminCollections.collections
                ? adminCollections.collections.map((item, index) => (
                    <UserCollection
                      link={'/admin-collections/'}
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
          </div>
          {adminCollections.total > 3 && (
            <Paginate
              countCollections={adminCollections.total}
              currentPage={page}
              onPageChange={getCollectionsPages}
            />
          )}
        </div>
      ) : (
        <div>
          <div className="m-4">
            <Link to="admin-panel">
              <div className="btn btn-secondary">{t('to admin panel')}</div>
            </Link>
          </div>
          {adminCollections.total === 0 && (
            <p className="text-danger text-center fs-4">{t('none collections')}</p>
          )}
        </div>
      )}
    </>
  );
}

export default AdminCollections;
