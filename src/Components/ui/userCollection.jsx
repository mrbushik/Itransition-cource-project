import React from 'react';
import { Link } from 'react-router-dom';

function UserCollection({ authorName, description, icon, name, type, id }) {
  return (
    <Link to={`collection/${id}`} className="text-decoration-none">
      <div className="border border-primary m-3" style={{ width: '250px' }}>
        <span className="text-decoration-none text-reset ms-2">autor:</span>
        <span className="ms-3">{authorName}</span>
        <div>
          <span className="text-decoration-none text-reset ms-2">type:</span>
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
          <p>{description}</p>
        </div>
      </div>
    </Link>
  );
}

export default UserCollection;
