/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import CustomField from '../../form/customField';
import SelectField from '../../form/selectedField';
import TagsField from '../../form/tagsField';

function EditItemsModal({ modalType, posts, postsTemplates, onClose, fieldsCount }) {
  let targetElement;
  const { t } = useTranslation();

  const [fieldValue, setFieldValue] = useState([]);

  const [editItem, setEditItem] = useState({
    item: '',
    tags: [],
  });

  const getFieldData = () => {
    if (targetElement) {
      let count = fieldsCount;
      const fieldArr = [];
      while (count > 0) {
        count--;
        fieldArr.push({ value: targetElement.fields[count] });
      }
      return fieldArr;
    }
  };

  useEffect(() => {
    if (targetElement) {
      setFieldValue(getFieldData().reverse());
      setEditItem((prevState) => ({ ...prevState, tags: [...targetElement.tags] }));
    }
  }, [editItem.item]);

  const handleChange = (target) => {
    setEditItem((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
  };

  if (editItem.item) {
    targetElement = posts.find((item) => item._id === editItem.item);
  }
  const collectionsNames = posts.map((item) => item._id);

  const handleChangeField = (event, index) => {
    const inputdata = [...fieldValue];
    inputdata[index].value = event;
    setFieldValue(inputdata);
  };
  const handleKeyDown = (e) => {
    if (e.key !== 'Enter') return;
    const value = e.target.value;
    if (!value.trim()) return;
    setEditItem((prevState) => ({ ...prevState, tags: [...editItem.tags, value] }));
    e.target.value = '';
  };
  const handleDeletTag = (index) => {
    setEditItem((prevState) => ({
      ...prevState,
      tags: editItem.tags.filter((el, i) => i !== index),
    }));
  };

  const handleSubmit = () => {
    console.log('submit');
  };
  return (
    <div className="modal-dialog modal-dialog-centered bg-light absolute-top mx-3 mt-3 p-3 dark-mode">
      <div className="modal-content h-100">
        <div className="modal-header">
          <h5 className="modal-title">{modalType}</h5>
          <button type="button" className="close" onClick={onClose}>
            <span>x</span>
          </button>
        </div>
        <div className="modal-body">
          <SelectField
            label={t('choose post')}
            name="item"
            options={collectionsNames}
            defaultOption={t('choose')}
            onChange={handleChange}
            value={editItem.item}
          />
        </div>
        {(modalType === 'Edit' || modalType === 'Редактировать') && editItem.item && (
          <>
            <TagsField
              tags={editItem.tags}
              onDeleteTag={handleDeletTag}
              onKeyDown={handleKeyDown}
            />
            {fieldValue &&
              fieldValue.map((item, index) => (
                <CustomField
                  key={index}
                  label={postsTemplates[index].description}
                  type={postsTemplates[index].type}
                  handleChangeField={handleChangeField}
                  index={index}
                  value={item.value}
                  checkboxDefault={true}
                />
              ))}
          </>
        )}
        <div className="modal-footer">
          <button type="button" className="btn btn-primary " onClick={handleSubmit}>
            {modalType}
          </button>
          <button type="button" className="btn btn-secondary mx-3" onClick={onClose}>
            {t('close')}
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditItemsModal;
