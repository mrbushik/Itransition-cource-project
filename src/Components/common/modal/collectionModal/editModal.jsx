/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';

import SelectField from '../../form/selectedField';
import TextAreaField from '../../form/textAreaField';
import TextField from '../../form/textField';

function EditModal({ modalType, collections, onActive }) {
  let targetElement;

  const [editItem, setEditItem] = useState({
    item: '',
    name: 'name of your collection ',
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
    targetElement = collections.find((item) => item.name === editItem.item);
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
  const collectionsNames = collections.map((item) => item.name);
  const handleSubmit = () => {
    console.log(targetElement._id);
  };
  return (
    <div className="modal-dialog modal-dialog-centered  bg-light absolute-top mx-3 mt-3 p-3">
      <div className="modal-content h-100">
        <div className="modal-header">
          <h5 className="modal-title">{modalType}</h5>
          <button type="button" className="close" onClick={onActive}>
            <span>x</span>
          </button>
        </div>
        <div className="modal-body">
          <SelectField
            label="Choose collection type"
            name="item"
            options={collectionsNames}
            defaultOption="Choose.."
            onChange={handleChange}
            value={editItem.item}
            // error={errors.theme}
          />
        </div>
        {modalType === 'Edit' && editItem.item && editItem && (
          <div>
            <TextField
              label="collection name"
              type="text"
              name="name"
              value={editItem.name}
              onChange={handleChange}
            />
            <SelectField
              label="Choose collection type"
              name="type"
              options={['books', 'clothes', 'sings']}
              onChange={handleChange}
              value={editItem.type}
            />
            <TextAreaField
              name="description"
              value={editItem.description}
              label={'collection description'}
              onChange={handleChange}
            />
          </div>
        )}
        <div className="modal-footer">
          <button type="button" className="btn btn-primary " onClick={handleSubmit}>
            {modalType}
          </button>
          <button type="button" className="btn btn-secondary mx-3" onClick={onActive}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditModal;
