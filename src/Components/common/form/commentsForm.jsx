/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import TextAreaField from './textAreaField';
import { getCollectionComments } from '../../services/getInfoRequests';
import CommentBody from '../../ui/commentBody';
import { writeCommentRequest } from '../../services/createRequest';
import { getToken } from '../../utils/token';

function CommentsForm({ collectionId }) {
  const { t } = useTranslation();
  const user = localStorage.getItem('user');
  const userId = localStorage.getItem('userId');

  const getCommentsURL = `${process.env.REACT_APP_DOMAIN_NAME}/api/get-collection-comments/${collectionId}`;
  const sendCommentURL = `${process.env.REACT_APP_DOMAIN_NAME}/api/add-comment`;

  const [commentsData, setCommentsData] = useState();
  const [comment, setComment] = useState({ commentText: '' });
  const [error, setError] = useState({ commentText: '' });

  const submitComment = {
    userName: user,
    userId: userId,
    commentText: comment.commentText,
    collectionId: collectionId,
  };

  const getAllCollectionComments = () => getCollectionComments(getCommentsURL, setCommentsData);

  useEffect(() => {
    const massageInterval = setInterval(() => {
      getAllCollectionComments();
    }, 5000);
    return () => clearInterval(massageInterval);
  }, []);

  const sendComment = () => {
    writeCommentRequest(sendCommentURL, submitComment, getAllCollectionComments, getToken());
    setComment({ commentText: '' });
  };

  useEffect(() => {
    getAllCollectionComments();
  }, []);

  useEffect(() => {
    setError({ commentText: '' });
  }, [comment]);

  const handleSubmit = () => {
    comment.commentText ? sendComment() : setError({ commentText: t('field required') });
  };

  const handleChange = (target) => {
    setComment((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
  };

  return (
    <div className="mx-3 comments-form">
      {commentsData &&
        commentsData.map((comment) => <CommentBody key={comment._id} commentData={comment} />)}
      {user && (
        <div className="mt-5 me-5" style={{ maxWidth: '600px' }}>
          <h5 className="mb-0">{t('write a comment')}</h5>
          <div>
            <TextAreaField
              placeholder={t('write a comment')}
              type="text"
              name="commentText"
              value={comment.commentText}
              onChange={handleChange}
              error={error.commentText}
            />
            <div className="btn btn-primary" onClick={handleSubmit}>
              {t('send')}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

CommentsForm.propTypes = {
  collectionId: PropTypes.string.isRequired,
};

export default CommentsForm;
