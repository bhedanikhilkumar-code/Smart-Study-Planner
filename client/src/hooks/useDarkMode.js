import { useEffect, useState } from 'react';

export const useDarkMode = () => {
  const [dark, setDark] = useState(localStorage.getItem('dark') === 'true');

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
    localStorage.setItem('dark', dark);
  }, [dark]);

  return { dark, setDark };
};
