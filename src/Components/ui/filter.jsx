import React, { useState } from 'react';
import SelectField from '../common/form/selectedField';
import { useTranslation } from 'react-i18next';

function Filter({ options, filterValues, onFilter, onUpdate, userId, setCollections }) {
  const { t } = useTranslation();
  const [filter, setFilter] = useState('new');

  const handleChange = (target) => {
    setFilter(target.value);
    findTargetValue(target.value);
  };

  const findTargetValue = (value) => {
    const findIndex = options.indexOf(value);
    onUpdate(
      `http://localhost:5000/api/user/${userId}/?filter=${filterValues[findIndex]} `,
      setCollections,
    );
  };

  return (
    <div>
      <h5 className="ms-3  dysplay">{t('display')}</h5>
      <SelectField name="type" options={options} onChange={handleChange} value={filter} />
    </div>
  );
}

export default Filter;
