/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getPosts } from '../services/getInfoRequests';
import { useParams } from 'react-router-dom';

import BackBtn from '../common/buttons/backBtn';
import ShowModal from '../common/modal/showModal';
import PostsRender from '../common/postsRender';
import NavBar from '../navigation/navBar';
import LikeBtn from '../common/buttons/likeBtn';
function UsersCollections() {
  const params = useParams();
  const { t } = useTranslation();

  const [collectionData, setCollectionData] = useState();
  const isAdmin = localStorage.getItem('role');
  useEffect(() => {
    getPosts(setCollectionData, params);
  }, []);

  const handleUpdateData = () => getPosts(setCollectionData, params);
  return (
    <>
      <NavBar />
      <BackBtn backLink={'/'} />

      <div className="d-flex justify-content-between">
        {collectionData && isAdmin === 'ADMIN' && (
          <ShowModal
            btnList={
              !collectionData.posts.length ? [t('create')] : [t('create'), t('edit'), t('delete')]
            }
            collectionId={params.Id}
            data={collectionData}
            onUpdateData={handleUpdateData}
          />
        )}
        {collectionData && <LikeBtn collectionId={collectionData._id} />}
      </div>

      {collectionData && <PostsRender data={collectionData} />}
    </>
  );
}

export default UsersCollections;
