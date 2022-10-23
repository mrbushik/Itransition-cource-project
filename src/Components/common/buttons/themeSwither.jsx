/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeTheme } from '../../redux/actions/theme';
function ThemeSwither() {
  const dispatch = useDispatch();
  const theme = useSelector(({ theme }) => theme.theme);
  const currentTheme = localStorage.getItem('theme');

  const [colorMod, setColorMod] = useState(currentTheme === 'dark' ? true : false);

  const onToggleTheme = (theme) => dispatch(changeTheme(theme));

  const handleChangeTeme = () => {
    colorMod ? handlTheme(false, 'light') : handlTheme(true, 'dark');
  };

  const handlTheme = (mode, theme) => {
    setColorMod(mode);
    onToggleTheme(theme);
    localStorage.setItem('theme', theme);
  };

  useEffect(() => {
    const body = document.querySelector('html');
    theme === 'light' ? body.classList.remove('dark-page') : body.classList.add('dark-page');
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
