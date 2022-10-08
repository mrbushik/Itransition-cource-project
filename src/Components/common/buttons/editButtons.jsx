import React from 'react';

function EditButtons({ onToggle, btnList }) {
  return (
    <div className="m-3">
      {btnList.map((item, index) => (
        <button
          key={index}
          type="button"
          className="btn btn-light ms-3"
          onClick={() => onToggle(item)}>
          {item}
        </button>
      ))}
    </div>
  );
}

export default EditButtons;
