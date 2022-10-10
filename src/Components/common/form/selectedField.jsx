import React from 'react';
import PropTypes from 'prop-types';

function SelectField({ label, value, onChange, defaultOption, options, error, name, group }) {
  const handleChange = ({ target }) => {
    onChange({ name: target.name, value: target.value, type: group });
  };
  const getInputClasses = () => {
    return 'form-select' + (error ? ' is-invalid' : '');
  };

  return (
    <div className="mb-3">
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <select
        className={getInputClasses()}
        id={name}
        name={name}
        label={label}
        value={value}
        onChange={handleChange}>
        <option disabled value="">
          {defaultOption}
        </option>
        {options.map((option, index) => (
          <option value={option} key={index}>
            {option}
          </option>
        ))}
      </select>
      {error && <p className="invalid-feedback text-danger">{error}</p>}
    </div>
  );
}
SelectField.propTypes = {
  defaulpOption: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  error: PropTypes.string,
  name: PropTypes.string,
  options: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

export default SelectField;
