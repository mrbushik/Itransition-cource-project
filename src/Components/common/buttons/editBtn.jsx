import React from 'react';
import PropTypes from 'prop-types';

function EditBtn({ onToggle, btnList }) {
  return (
    <div className="m-3 ">
      {btnList.map((item, index) => (
        <button
          key={index}
          name={index}
          type="button"
          className="btn btn-light me-3 mt-2"
          onClick={(e) => onToggle(index)}>
          {item}
        </button>
      ))}
    </div>
  );
}

EditBtn.propTypes = {
  onToggle: PropTypes.func.isRequired,
  btnList: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default EditBtn;
