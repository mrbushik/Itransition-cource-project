import React from 'react';

function EditButtons({ onToggle }) {
  return (
    <div className="m-3">
      <button type="button" className="btn btn-light ms-3" onClick={() => onToggle('create')}>
        Create
      </button>
      <button type="button" className="btn btn-light ms-3" onClick={() => onToggle('edit')}>
        Edit
      </button>
      <button type="button" className="btn btn-light ms-3" onClick={() => onToggle('delete')}>
        Delete
      </button>
    </div>
  );
}

export default EditButtons;
