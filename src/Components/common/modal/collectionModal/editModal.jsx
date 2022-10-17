/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  editCollectionRequest,
  modalDeleteInOwner,
  modalDelete,
  deleteAllPosts,
} from '../../../services/modalRequests';
import { validator } from '../../../utils/validator';

import SelectField from '../../form/selectedField';
import TextAreaField from '../../form/textAreaField';
import TextField from '../../form/textField';

function EditModal({ modalType, collections, onActive, updateCollectionsData }) {
  let targetElement;
  // const UserId = localStorage.getItem('userId');
  const { t } = useTranslation();
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

  if (editItem.item) {
    targetElement = collections.find((item) => item._id === editItem.item);
  }

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

  const selectedValue = [];
  for (let i = 0; i < collections.length; i++) {
    selectedValue.push({ option: collections[i].name, value: collections[i]._id });
  }

  const modifiedCollection = {
    name: editItem.name,
    description: editItem.description,
    type: editItem.type,
  };

  const deleteCollection = (URL, collectionId, ownerId) => {
    deleteAllPosts(`http://localhost:5000/api/delete-posts-from-collection/${collectionId}`);
    modalDeleteInOwner(`http://localhost:5000/api/delete-collection-user/${ownerId}`, collectionId);
    modalDelete(URL, updateCollectionsData);
    setEditItem({ item: '' });
    onActive();
  };

  const validatorConfig = {
    name: {
      isRequired: {
        message: t('field required'),
      },
    },
    type: {
      isRequired: {
        message: t('field required'),
      },
    },
    description: {
      isRequired: {
        message: t('field required'),
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

  const isValid = Object.keys(errors).length === 0;

  const collectionEdit = (URL) => {
    editCollectionRequest(URL, modifiedCollection, updateCollectionsData);
  };

  const targetRequest = (URL, collectionId, ownerId) => {
    modalType === t('edit') ? collectionEdit(URL) : deleteCollection(URL, collectionId, ownerId);
  };

  const handleSubmit = () => {
    if (targetElement) {
      const URL = `http://localhost:5000/api/change-collection/${targetElement._id}`;
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
            label={t('select collection')}
            name="item"
            options={selectedValue}
            defaultOption={t('choose')}
            onChange={handleChange}
            value={editItem.item}
            selectElement={true}
          />
        </div>
        {(modalType === 'Edit' || modalType === 'Редактировать') && editItem.item && editItem && (
          <div>
            <TextField
              label={t('collection name')}
              type="text"
              name="name"
              value={editItem.name}
              onChange={handleChange}
              error={errors.name}
            />
            <SelectField
              label={t('choose collection')}
              name="type"
              options={[t('books'), t('music'), t('clothes')]}
              onChange={handleChange}
              value={editItem.type}
              error={errors.type}
            />
            <TextAreaField
              name="description"
              value={editItem.description}
              label={t('collection description')}
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
            {t('close')}
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditModal;
