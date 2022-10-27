/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeTheme } from '../../redux/actions/theme';
import themeKeys from '../../theme/themeKeys';

function ThemeSwither() {
  const dispatch = useDispatch();
  const theme = useSelector(({ theme }) => theme.theme);
  const currentTheme = localStorage.getItem('theme');

  const [colorMod, setColorMod] = useState(currentTheme === themeKeys.DARK ? true : false);

  const onToggleTheme = (theme) => dispatch(changeTheme(theme));

  const handleChangeTeme = () => {
    colorMod ? handlTheme(false, themeKeys.LIGHT) : handlTheme(true, themeKeys.DARK);
  };

  const handlTheme = (mode, theme) => {
    setColorMod(mode);
    onToggleTheme(theme);
    localStorage.setItem('theme', theme);
  };

  useEffect(() => {
    const body = document.querySelector('html');
    theme === themeKeys.DARK ? body.classList.add('dark-page') : body.classList.remove('dark-page');
  }, [colorMod]);

  return (
    <>
      <label id="swither" className="swither">
        <input type="checkbox" checked={colorMod} onChange={handleChangeTeme} />
        <span className="toggler roundItem"></span>
      </label>
    </>
  );
}

export default ThemeSwither;
