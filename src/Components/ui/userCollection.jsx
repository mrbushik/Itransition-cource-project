import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function UserCollection({ authorName, description, icon, name, type, id, link, newPost }) {
  const { t } = useTranslation();
  const descriptionParse = [];

  Array.prototype.forEach.call(description.split('\n'), (item) => {
    descriptionParse.push(item);
  });
  return (
    <div className="border border-primary mb-3 me-4" style={{ width: '250px' }}>
      <Link to={`${link}${id}`} className="text-decoration-none">
        {newPost && (
          <div>
            <h5 className="mx-3 ms-2 mb-1">{t('added post')}:</h5>{' '}
            <div className="mx-2">
              <span className="text-success fs-6 fw-semibold" style={{ overflowWrap: 'anywhere' }}>
                {newPost}
              </span>
            </div>
          </div>
        )}
        <span className="text-decoration-none text-reset ms-2"> {t('autor')}:</span>
        <span className="ms-3">{authorName}</span>
        <div>
          <span className="text-decoration-none text-reset ms-2"> {t('type')}:</span>
          <span className="ms-3">{type}</span>
        </div>
        <div className="m-2">
          <div className="d-flex justify-content-center  mt-2 mb-2" style={{ height: '200px' }}>
            <img
              className="rounded-0"
              style={{ maxWidth: '200px', maxHeight: '200px' }}
              src={icon}
              alt="img"
            />
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

export default UserCollection;
