import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { getDate } from '../utils/getDate';

function CommentBody({ commentData }) {
  const { t } = useTranslation();
  const textCommentParse = [];

  const commentCreateDate = getDate(commentData.date);

  Array.prototype.forEach.call(commentData.commentText.split('\n'), (item) => {
    textCommentParse.push(item);
  });

  return (
    <div className="border border-primary mb-3 pb-3">
      <div className="d-flex ms-2 mt-2">
        <p className="me-2 ">{t('autor')}</p>
        <p className="text-success">{commentData.userName}</p>
      </div>
      {textCommentParse?.map((item, index) => (
        <p className="ms-2 mb-0" key={index}>
          {item}
        </p>
      ))}
      <p className="text-muted fw-semibold text-end comment-date me-2 mb-0">{commentCreateDate}</p>
    </div>
  );
}

CommentBody.propTypes = {
  commentData: PropTypes.object,
};

export default CommentBody;
