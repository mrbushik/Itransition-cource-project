import React from 'react';

function EditButtons({ onToggle, btnList }) {
  return (
    <div className="m-3 ">
      {btnList.map((item, index) => (
        <button
          key={index}
          type="button"
          className="btn btn-light me-3 mt-2"
          onClick={() => onToggle(item)}>
          {item}
        </button>
      ))}
    </div>
  );
}

export default EditButtons;
