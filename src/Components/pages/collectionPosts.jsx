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
import CommentsForm from '../common/form/commentsForm';

function CollectionPosts() {
  const params = useParams();
  const { t } = useTranslation();
  const [collectionData, setCollectionData] = useState();

  const postsURL = `${process.env.REACT_APP_DOMAIN_NAME}/api/collection/${params.Id}`;

  const handleUpdateData = () => getPosts(postsURL, setCollectionData, params);

  useEffect(() => {
    getPosts(postsURL, setCollectionData, params);
  }, []);

  return (
    <>
      <NavBar />
      <div className="d-flex justify-content-between align-items-center flex-wrap">
        <BackBtn backLink={'/collection'} />
        <LikeBtn collectionId={params.Id} />
      </div>
      {collectionData && (
        <ShowModal
          btnList={
            !collectionData.posts.length ? [t('create')] : [t('create'), t('edit'), t('delete')]
          }
          collectionId={params.Id}
          data={collectionData}
          onUpdateData={handleUpdateData}
        />
      )}
      {collectionData && <PostsRender data={collectionData} />}
      {collectionData && <CommentsForm collectionId={params.Id} />}
    </>
  );
}

export default CollectionPosts;
