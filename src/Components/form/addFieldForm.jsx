import React from 'react';
import SelectField from './selectedField';
import TextField from './textField';

function AddFieldForm({ handleChangeField, dataType, dataDescription, index, onDelete }) {
  const handleChange = (e) => {
    handleChangeField(e.value, index, e.name);
  };
  return (
    <div className="mt-2">
      <button className="btn btn-danger float-end mb-2" onClick={() => onDelete(index)}>
        delete
      </button>
      <SelectField
        label="Select the field to add"
        name="type"
        options={['number', 'text', 'multiline text', 'checkbox', 'date']}
        defaultOption="Choose.."
        onChange={handleChange}
        value={dataType}
      />
      <TextField
        label="description"
        type="text"
        name="description"
        value={dataDescription}
        onChange={handleChange}
      />
    </div>
  );
}

export default AddFieldForm;
