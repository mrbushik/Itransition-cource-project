/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { getPosts } from '../services/getInfoRequests';
import { useParams } from 'react-router-dom';

import BackBtn from '../common/buttons/backBtn';
import PostsRender from '../common/postsRender';
import NavBar from '../navigation/navBar';
import LikeBtn from '../common/buttons/likeBtn';
import CommentsForm from '../common/form/commentsForm';
function UsersCollections() {
  const params = useParams();
  const postsURL = `${process.env.REACT_APP_DOMAIN_NAME}/api/collection/${params.Id}`;
  // console.log(postsURL);
  const [collectionData, setCollectionData] = useState();

  useEffect(() => {
    getPosts(postsURL, setCollectionData, params);
  }, []);

  return (
    <>
      <NavBar />
      <div className="d-flex justify-content-between">
        <BackBtn backLink={'/'} />
        {collectionData && <LikeBtn collectionId={collectionData._id} />}
      </div>
      {collectionData && <PostsRender data={collectionData} />}
      {collectionData && <CommentsForm collectionId={params.Id} />}
    </>
  );
}

export default UsersCollections;
