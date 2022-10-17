import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import TextAreaField from './textAreaField';

function CommentsForm({ collectionId }) {
  const { t } = useTranslation();
  const user = localStorage.getItem('user');
  const userId = localStorage.getItem('userId');

  const [comment, setComment] = useState({ commentText: '' });
  const [error, setError] = useState({ commentText: '' });

  const submitComment = {
    user: user,
    userId: userId,
    commentText: comment.commentText,
    collectionId: collectionId,
  };

  useEffect(() => {
    setError({ commentText: '' });
  }, [comment]);

  const handleSubmit = () => {
    if (comment.commentText) {
      // submiting data in future
      console.log(submitComment);
    } else {
      setError({ commentText: t('field required') });
    }
  };

  const handleChange = (target) => {
    setComment((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
  };

  return (
    <div className="ms-3 mb-4">
      <p>some comments</p>
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
    </div>
  );
}

CommentsForm.propTypes = {
  collectionId: PropTypes.string.isRequired,
};

export default CommentsForm;
