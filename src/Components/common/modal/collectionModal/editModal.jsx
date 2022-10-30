/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { validator } from '../../../utils/validator';

import {
  editCollectionRequest,
  modalDeleteInOwner,
  modalDelete,
} from '../../../services/modalRequests';

import SelectField from '../../form/selectedField';
import TextAreaField from '../../form/textAreaField';
import TextField from '../../form/textField';
import { getToken } from '../../../utils/token';
import translateKeys from '../../../translate/translateKeys';

function EditModal({ modalType, collections, onActive, updateCollectionsData }) {
  const { t } = useTranslation();
  let targetElement;
  const selectedValue = [];
  const selectedOptions = [
    t(translateKeys.BOOKS),
    t(translateKeys.MUSIK),
    t(translateKeys.CLOTHES),
  ];

  const [errors, setErrors] = useState({});
  const [editItem, setEditItem] = useState({
    item: '',
    name: '',
    description: '',
    type: '',
  });

  const handleChange = (target) => {
    setEditItem((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
  };

  if (editItem.item) targetElement = collections.find((item) => item._id === editItem.item);

  useEffect(() => {
    if (targetElement) {
      const defailtInputValue = {
        item: editItem.item,
        name: targetElement.name,
        description: targetElement.description,
        type: targetElement.type,
      };
      setEditItem(defailtInputValue);
    }
  }, [editItem.item]);

  for (let i = 0; i < collections.length; i++) {
    selectedValue.push({ option: collections[i].name, value: collections[i]._id });
  }

  const modifiedCollection = {
    name: editItem.name,
    description: editItem.description,
    type: editItem.type,
  };

  const validatorConfig = {
    name: {
      isRequired: {
        message: t(translateKeys.FIELD_REQUIRED),
      },
      max: {
        message: t(translateKeys.FIELD_MAX_LENGTH),
        value: 30,
      },
    },
    type: {
      isRequired: {
        message: t(translateKeys.FIELD_REQUIRED),
      },
    },
    description: {
      isRequired: {
        message: t(translateKeys.FIELD_REQUIRED),
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

  const isValid = !Object.keys(errors).length;

  const collectionEdit = (URL) => {
    editCollectionRequest(URL, modifiedCollection, updateCollectionsData, getToken());
  };

  const deleteCollection = (URL, collectionId, ownerId) => {
    modalDeleteInOwner(
      `${process.env.REACT_APP_DOMAIN_NAME}/api/delete-collection-user/${ownerId}`,
      collectionId,
      getToken(),
    );
    modalDelete(URL, updateCollectionsData, getToken());
    setEditItem({ item: '' });
    onActive();
  };

  const targetRequest = (URL, collectionId, ownerId) => {
    modalType === t(translateKeys.EDIT)
      ? collectionEdit(URL)
      : deleteCollection(URL, collectionId, ownerId);
  };

  const handleSubmit = () => {
    if (targetElement) {
      const URL = `${process.env.REACT_APP_DOMAIN_NAME}/api/change-collection/${targetElement._id}`;
      targetRequest(URL, targetElement._id, targetElement._ownerId);
    }
  };

  return (
    <div className="modal-dialog modal-dialog-centered  bg-light absolute-top mx-3 mt-3 p-3 dark-mode">
      <div className="modal-content h-100">
        <div className="modal-header">
          <h5 className="modal-title">{modalType}</h5>
          <button type="button" className="close" onClick={onActive}>
            <span>x</span>
          </button>
        </div>
        <div className="modal-body">
          <SelectField
            label={t(translateKeys.SELECT_COLLECTION)}
            name="item"
            options={selectedValue}
            defaultOption={t(translateKeys.CHOOSE)}
            onChange={handleChange}
            value={editItem.item}
            selectElement={true}
          />
        </div>
        {modalType === t(translateKeys.EDIT) && editItem.item && editItem && (
          <div>
            <TextField
              label={t(translateKeys.COLLECTION_NAME)}
              type="text"
              name="name"
              value={editItem.name}
              onChange={handleChange}
              error={errors.name}
            />
            <SelectField
              label={t(translateKeys.CHOOSE_COLLECTION)}
              name="type"
              options={selectedOptions}
              onChange={handleChange}
              value={editItem.type}
              error={errors.type}
            />
            <TextAreaField
              name="description"
              value={editItem.description}
              label={t(translateKeys.COLLECTION_DESCRIPTION)}
              onChange={handleChange}
              error={errors.description}
            />
          </div>
        )}
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-primary "
            onClick={handleSubmit}
            disabled={!isValid}>
            {modalType}
          </button>
          <button type="button" className="btn btn-secondary mx-3" onClick={onActive}>
            {t(translateKeys.CLOSE)}
          </button>
        </div>
      </div>
    </div>
  );
}

EditModal.propTypes = {
  modalType: PropTypes.string,
  collections: PropTypes.arrayOf(PropTypes.object).isRequired,
  onActive: PropTypes.func,
  updateCollectionsData: PropTypes.func,
};

export default EditModal;
