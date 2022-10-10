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
    if (colorMod) {
      setColorMod(false);
      onToggleTheme('light');
      localStorage.setItem('theme', 'light');
    } else if (!colorMod) {
      setColorMod(true);
      onToggleTheme('dark');
      localStorage.setItem('theme', 'dark');
    }
  };

  useEffect(() => {
    const body = document.querySelector('html');
    if (theme === 'light') {
      body.classList.remove('dark-page');
    } else if (theme === 'dark') {
      body.classList.add('dark-page');
    }
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
