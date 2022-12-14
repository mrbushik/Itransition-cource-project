/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { validator } from '../../utils/validator';
import { useTranslation } from 'react-i18next';

import SelectField from './selectedField';
import TextField from './textField';
import translateKeys from '../../translate/translateKeys';

function AddFieldForm({ handleChangeField, dataType, dataDescription, index, onDelete }) {
  const { t } = useTranslation();

  const SELECTED_OPTIONS = ['number', 'text', 'multiline text', 'checkbox', 'date'];
  const SELECTED_TRANSLATED_OPTIONS = [
    t(translateKeys.NUMBER),
    t(translateKeys.TEXT),
    t(translateKeys.MULTILINE_TEXT),
    t(translateKeys.CHECKBOX_FIELD),
    t(translateKeys.DATE),
  ];

  const handleChangeChoose = (e) => {
    const optionIndex = SELECTED_TRANSLATED_OPTIONS.indexOf(e.value);
    handleChangeField(SELECTED_OPTIONS[optionIndex], index, e.name);
  };

  const handleChange = (e) => {
    handleChangeField(e.value, index, e.name);
  };

  const getSelectedValue = () => {
    const themeIndex = SELECTED_OPTIONS.indexOf(dataType);
    if (themeIndex === -1) return '';
    return SELECTED_TRANSLATED_OPTIONS[themeIndex];
  };

  const [errors, setErrors] = useState({});
  const validate = () => {
    const errors = validator({ type: dataType, description: dataDescription }, validatorConfig);
    setErrors(errors);
  };

  useEffect(() => {
    validate();
  }, [dataType, dataDescription]);

  const validatorConfig = {
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

  return (
    <div className="mt-2">
      <button className="btn btn-danger float-end mb-2" onClick={() => onDelete(index)}>
        {t(translateKeys.DELETE)}
      </button>
      <SelectField
        label={t(translateKeys.SELECT_FIELD_TO_ADD)}
        name="type"
        options={SELECTED_TRANSLATED_OPTIONS}
        defaultOption={t(translateKeys.CHOOSE)}
        onChange={handleChangeChoose}
        value={getSelectedValue()}
        error={errors.type}
      />
      <TextField
        label={t(translateKeys.DESCRIPTION)}
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
