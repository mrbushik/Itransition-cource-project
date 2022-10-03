/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import SelectField from './selectedField';
import TextField from './textField';
import { validator } from '../../utils/validator';

function AddFieldForm({
  handleChangeField,
  dataType,
  dataDescription,
  index,
  onDelete,
  type,
  delitingForm,
}) {
  const handleChange = (e) => {
    handleChangeField(e.value, index, e.name);
  };
  const [errors, setErrors] = React.useState({});
  const validate = () => {
    const errors = validator({ type: dataType, description: dataDescription }, validatorConfig);
    setErrors(errors);
  };
  React.useEffect(() => {
    validate();
  }, [dataType, dataDescription]);
  const validatorConfig = {
    type: {
      isRequired: {
        message: 'this field is required',
      },
    },
    description: {
      isRequired: {
        message: 'this field is required',
      },
    },
  };
  const CustomField = () => {
    if (dataType) {
      return (
        <TextField
          label="description"
          // type={dataType}
          type="checkbox"
          name="description"
          value={dataDescription}
          onChange={handleChange}
          error={errors.description}
        />
      );
    }
  };
  return (
    <div className="mt-2">
      {!delitingForm ? (
        <button className="btn btn-danger float-end mb-2" onClick={() => onDelete(index)}>
          delete
        </button>
      ) : (
        ''
      )}
      <SelectField
        label="Select the field to add"
        name="type"
        options={['number', 'text', 'multiline text', 'checkbox', 'date']}
        defaultOption="Choose.."
        onChange={handleChange}
        value={dataType}
        error={errors.type}
      />
      {type === 'multiField' ? (
        <CustomField />
      ) : (
        <TextField
          label="description"
          type="text"
          name="description"
          value={dataDescription}
          onChange={handleChange}
          error={errors.description}
        />
      )}
    </div>
  );
}

export default AddFieldForm;
