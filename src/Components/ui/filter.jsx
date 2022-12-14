import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { filter, filterValue } from '../redux/actions/filter';

import SelectField from '../common/form/selectedField';
import translateKeys from '../translate/translateKeys';

function Filter({ options, filterValues, onUpdate, userId, setCollections }) {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const newFilter = useSelector(({ filter }) => filter.filter);

  const handleChange = (target) => {
    dispatch(filter(target.value));
    findTargetValue(target.value);
  };

  const findTargetValue = (value) => {
    const findIndex = options.indexOf(value);
    dispatch(filterValue(filterValues[findIndex]));
    onUpdate(
      `${process.env.REACT_APP_DOMAIN_NAME}/api/user/${userId}/?filter=${filterValues[findIndex]} `,
      setCollections,
    );
  };

  return (
    <div>
      <h5 className="ms-3  dysplay">{t(translateKeys.DISPLAY)}</h5>
      <SelectField name="type" options={options} onChange={handleChange} value={newFilter} />
    </div>
  );
}

export default Filter;
