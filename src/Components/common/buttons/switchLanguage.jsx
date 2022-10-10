import React, { useState, useEffect } from 'react';
import i18n from '../../translate/languageParams';
import useLocalStorage from '../../translate/recordLanguage';
function SwitchLanguage() {
  const [currentValue, setCurrentValue] = useState('');
  const [language, setLanguage] = useLocalStorage('language', 'en');

  const handleCheck = () => {
    setCurrentValue(!currentValue);
    if (language === 'en') {
      i18n.changeLanguage('ru');
      setLanguage('ru');
    } else if (language === 'ru') {
      i18n.changeLanguage('en');
      setLanguage('en');
    }
  };
  useEffect(() => {
    if (language === 'ru') {
      setCurrentValue(true);
    } else {
      setCurrentValue(false);
    }
  }, []);

  return (
    <>
      <div>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/a/ae/Flag_of_the_United_Kingdom.svg"
          alt="en"
          style={{ width: '5%' }}
        />
        <label className="switch">
          <input type="checkbox" checked={currentValue ? true : false} onChange={handleCheck} />
          <span className="slider"></span>
        </label>{' '}
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/3/37/Flag_of_Russia_%28bordered%29.svg"
          alt="ru"
          style={{ width: '5%' }}
        />
      </div>
    </>
  );
}

export default SwitchLanguage;
