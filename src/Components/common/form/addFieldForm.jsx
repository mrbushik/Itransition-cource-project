/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import PropTypes from 'prop-types';
import { validator } from '../../utils/validator';
import { useTranslation } from 'react-i18next';

import SelectField from './selectedField';
import TextField from './textField';

function AddFieldForm({ handleChangeField, dataType, dataDescription, index, onDelete }) {
  const { t } = useTranslation();

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
        message: t('field required'),
      },
    },
    description: {
      isRequired: {
        message: t('field required'),
      },
    },
  };

  return (
    <div className="mt-2">
      <button className="btn btn-danger float-end mb-2" onClick={() => onDelete(index)}>
        delete
      </button>
      <SelectField
        label={t('Select field to add')}
        name="type"
        options={['number', 'text', 'multiline text', 'checkbox', 'date']}
        defaultOption={t('choose')}
        onChange={handleChange}
        value={dataType}
        error={errors.type}
      />
      <TextField
        label={t('description')}
        type="text"
        name="description"
        value={dataDescription}
        onChange={handleChange}
        error={errors.description}
      />
    </div>
  );
}

AddFieldForm.propTypes = {
  index: PropTypes.number.isRequired,
  dataDescription: PropTypes.string,
  dataType: PropTypes.string,
  handleChangeField: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default AddFieldForm;
