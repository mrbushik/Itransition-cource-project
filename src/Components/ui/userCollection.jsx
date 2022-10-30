import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import translateKeys from '../translate/translateKeys';

function UserCollection({ authorName, description, icon, name, type, id, link, newPost }) {
  const { t } = useTranslation();
  const descriptionParse = [];

  const COLLECTION_TYPES = ['books', 'music', 'clothes'];
  const COLLECTION_TRANSLATED_TYPES = [
    t(translateKeys.BOOKS),
    t(translateKeys.MUSIK),
    t(translateKeys.CLOTHES),
  ];

  const getSelectedValue = () => {
    const themeIndex = COLLECTION_TYPES.indexOf(type);
    console.log(themeIndex);
    return COLLECTION_TRANSLATED_TYPES[themeIndex];
  };

  Array.prototype.forEach.call(description.split('\n'), (item) => {
    descriptionParse.push(item);
  });

  return (
    <div className="border border-primary mb-3 me-4 user-collection">
      <Link to={`${link}${id}`} className="text-decoration-none">
        {newPost && (
          <div>
            <h5 className="mx-3 ms-2 mb-1">{t(translateKeys.ADDED_POST)}:</h5>
            <div className="mx-2">
              <span className="text-success fs-6 fw-semibold new-post">{newPost}</span>
            </div>
          </div>
        )}
        <span className="text-decoration-none text-reset ms-2"> {t(translateKeys.AUTOR)}:</span>
        <span className="ms-3">{authorName}</span>
        <div>
          <span className="text-decoration-none text-reset ms-2"> {t(translateKeys.TYPE)}:</span>
          <span className="ms-3">{getSelectedValue()}</span>
        </div>
        <div className="m-2">
          <div className="d-flex justify-content-center  mt-2 mb-2 h-200">
            <img className="rounded-0 collection-img" src={icon} alt="img" />
          </div>
          <h4>{name}</h4>
          {descriptionParse.map((item, index) => (
            <p key={index} className="m-0">
              {item}
            </p>
          ))}
        </div>
      </Link>
    </div>
  );
}
UserCollection.propTypes = {
  authorName: PropTypes.string,
  link: PropTypes.string,
  id: PropTypes.string,
  type: PropTypes.string,
  icon: PropTypes.string,
  newPost: PropTypes.string,
  description: PropTypes.string,
  name: PropTypes.string,
};

export default UserCollection;
