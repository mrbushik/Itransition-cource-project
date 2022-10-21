/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { validator } from '../../../utils/validator';
import { useTranslation } from 'react-i18next';
import { editPostRequest, modalDelete, modalDeleteInOwner } from '../../../services/modalRequests';

import CustomField from '../../form/customField';
import SelectField from '../../form/selectedField';
import TagsField from '../../form/tagsField';
import TextField from '../../form/textField';

function EditItemsModal({
  modalType,
  posts,
  postsTemplates,
  onClose,
  fieldsCount,
  onUpdateData,
  collectionId,
}) {
  let targetElement;
  const { t } = useTranslation();
  const [fieldValue, setFieldValue] = useState([]);
  const [tags, setTags] = useState([]);
  const [errors, setErrors] = useState({});

  const [editItem, setEditItem] = useState({
    item: '',
    name: '',
  });

  const URL = `http://localhost:5000/api/change-post/${editItem.item}`;
  const fieldValueInArray = fieldValue.map((item) => item.value);
  const isValid = Object.keys(errors).length === 0;
  const collectionsNames = posts.map((item) => item._id);

  const sendingData = {
    fields: [editItem.name, ...fieldValueInArray],
    tags: tags.map((item) => item.text),
  };

  const validatorConfig = {
    name: {
      isRequired: {
        message: t('field required'),
      },
      max: {
        message: t('field max length'),
        value: 30,
      },
    },
  };

  const validate = () => {
    const errors = validator(editItem, validatorConfig);
    setErrors(errors);
  };

  useEffect(() => {
    validate();
  }, [editItem]);

  const getFieldData = () => {
    let count = fieldsCount;
    const targetFields = targetElement.fields.slice(1, fieldsCount + 2);

    return createFields(count, targetFields);
  };

  const createFields = (count, targetFields) => {
    const fieldArr = [];
    while (count > 0) {
      count--;
      fieldArr.push({ value: targetFields[count] });
    }
    return fieldArr.reverse();
  };

  useEffect(() => {
    if (targetElement) {
      handleChange({ name: 'name', value: targetElement.fields[0] });
      setFieldValue(getFieldData());
      handleGetTags(targetElement.tags);
    }
  }, [editItem.item]);

  const handleGetTags = (tags) => {
    const tagsList = [];
    for (let i = 0; i < tags.length; i++) {
      tagsList.push({ id: tags[i], text: tags[i] });
    }
    setTags(tagsList);
  };

  const deleteTagsError = () => {
    const otherErrors = errors;
    delete otherErrors.tags;
    setErrors(otherErrors);
  };

  const addTagsError = () => {
    const otherErrors = errors;
    otherErrors.tags = t('field required');
    setErrors({ tags: t('field required') });
  };

  const handleChange = (target) => {
    setEditItem((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
  };

  if (editItem.item) {
    targetElement = posts.find((item) => item._id === editItem.item);
  }

  const handleChangeField = (event, index) => {
    const inputdata = [...fieldValue];
    inputdata[index].value = event;
    setFieldValue(inputdata);
  };

  const handleDeleteTag = (i) => {
    setTags(tags.filter((tag, index) => index !== i));
  };

  const handleAddition = (tag) => {
    deleteTagsError();
    setTags([...tags, tag]);
  };

  const editPost = () => {
    if (tags.length === 0) {
      addTagsError();
      return;
    }
    editPostRequest(URL, sendingData, onUpdateData);
  };

  const deletePost = () => {
    modalDeleteInOwner(
      `http://localhost:5000/api/delete-collection-post/${collectionId}`,
      editItem.item,
    );
    modalDelete(URL, onUpdateData);
    setEditItem({ item: '' });
  };

  const handleSubmit = () => {
    modalType === t('edit') ? editPost() : deletePost();
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
            error={errors.item}
          />
        </div>
        {modalType === t('edit') && editItem.item && (
          <>
            <TagsField
              handleDelete={handleDeleteTag}
              tags={tags}
              handleAddition={handleAddition}
              error={errors.tags}
            />
            <TextField
              name="name"
              value={editItem.name}
              onChange={handleChange}
              placeholder={t('post description')}
              label={t('post description')}
              error={errors.name}
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
          <button
            type="button"
            className="btn btn-primary "
            disabled={!isValid}
            onClick={handleSubmit}>
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

EditItemsModal.propTypes = {
  fieldsCount: PropTypes.number,
  modalType: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  onUpdateData: PropTypes.func.isRequired,
  posts: PropTypes.arrayOf(PropTypes.object),
  postsTemplates: PropTypes.arrayOf(PropTypes.object),
};

export default EditItemsModal;
