import React from 'react';
import { useTranslation } from 'react-i18next';

function TagsField({ tags, onDeleteTag, onKeyDown }) {
  const { t } = useTranslation();

  return (
    <div className="">
      <div className="d-flex flex-wrap">
        {tags.map((tag, index) => (
          <div className="bg-secondary rounded-pill m-1 p-1 d-flex align-items-center" key={index}>
            <span className="text ms-1">{tag}</span>
            <div className="vr ms-1"></div>
            <p
              className="mx-2 mb-0 rounded-circle d-flex justify-content-center cursor-pointer"
              style={{ width: '10px', cursor: 'pointer' }}
              onClick={() => onDeleteTag(index)}>
              x
            </p>
          </div>
        ))}
      </div>

      <input
        onKeyDown={onKeyDown}
        type="text"
        className="form-control my-2"
        placeholder={t('write tag')}
      />
    </div>
  );
}

export default TagsField;
