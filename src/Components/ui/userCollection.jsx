import React from 'react';
import { Link } from 'react-router-dom';

function UserCollection({ authorName, description, icon, name, type, id }) {
  return (
    <Link to={`/${id}`} className="text-decoration-none">
      <div className="border border-primary m-3">
        <span className="text-decoration-none text-reset ms-2">autor:</span>
        <span className="ms-3">{authorName}</span>
        <div>
          <span className="text-decoration-none text-reset ms-2">type:</span>
          <span className="ms-3">{type}</span>
        </div>
        <div className="m-2">
          <div
            className="d-flex justify-content-center  mt-2 mb-2"
            style={{ width: '150px', height: '150px' }}>
            <img
              className="rounded-0"
              style={{ maxWidth: '150px', maxHeight: '150px' }}
              src={icon}
              alt="img"
            />
          </div>
          <h4>{name}</h4>
          <p>{description}</p>
        </div>
      </div>
    </Link>
  );
}

export default UserCollection;
