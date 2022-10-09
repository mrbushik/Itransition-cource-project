/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getPosts } from '../services/getInfoRequests';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import BackBtn from '../common/buttons/backBtn';
import ShowModal from '../common/modal/showModal';
import PostsRender from '../common/postsRender';
import NavBar from '../navigation/navBar';

function CollectionPosts({ editButtons }) {
  const params = useParams();
  const { t } = useTranslation();
  // const theme = useSelector(({ theme }) => theme.theme);

  const [collectionData, setCollectionData] = useState();
  useEffect(() => {
    getPosts(setCollectionData, params);
  }, []);

  return (
    <>
      <NavBar />
      <BackBtn backLink={'/'} />
      {collectionData && (
        <ShowModal
          btnList={
            !collectionData.posts.length ? [t('create')] : [t('create'), t('edit'), t('delete')]
          }
          collectionId={params.Id}
          data={collectionData}
        />
      )}
      {collectionData && <PostsRender data={collectionData} />}
    </>
  );
}

export default CollectionPosts;
