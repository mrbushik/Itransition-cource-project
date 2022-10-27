/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import i18n from '../../translate/languageParams';
import useLocalStorage from '../../translate/recordLanguage';

function SwitchLanguage() {
  const [currentValue, setCurrentValue] = useState('');
  const [language, setLanguage] = useLocalStorage('language', 'en');

  const handleCheck = () => {
    setCurrentValue(!currentValue);
    language === 'en'
      ? i18n.changeLanguage('ru') && setLanguage('ru')
      : i18n.changeLanguage('en') && setLanguage('en');
  };
  useEffect(() => {
    language === 'ru' ? setCurrentValue(true) : setCurrentValue(false);
  }, []);

  return (
    <>
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/a/ae/Flag_of_the_United_Kingdom.svg"
        alt="en"
        style={{ width: '40px' }}
      />
      <label className="switch">
        <input type="checkbox" checked={currentValue ? true : false} onChange={handleCheck} />
        <span className="slider"></span>
      </label>
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/3/37/Flag_of_Russia_%28bordered%29.svg"
        alt="ru"
        style={{ width: '40px' }}
      />
    </>
  );
}

export default SwitchLanguage;
