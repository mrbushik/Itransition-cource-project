import React from 'react';

function TagsField({ tags, onDeleteTag, onKeyDown }) {
  return (
    <div className="">
      <div className="d-flex">
        {tags.map((tag, index) => (
          <div className="bg-secondary rounded-pill m-2 p-1 d-flex align-items-center" key={index}>
            <span className="text ms-1">{tag}</span>
            <div className="vr ms-1"></div>
            <p
              className="mx-2 mb-0 rounded-circle d-flex justify-content-center"
              style={{ width: '10px' }}
              onClick={() => onDeleteTag(index)}>
              x
            </p>
          </div>
        ))}
      </div>

      <input
        onKeyDown={onKeyDown}
        type="text"
        className="form-control"
        placeholder="Type somthing"
      />
    </div>
  );
}

export default TagsField;
