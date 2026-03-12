import { useEffect, useState } from 'react';
// хук для переключения темы и сохранения выбранного режима в localStorage.
function useTheme() {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const savedTheme = localStorage.getItem('app-theme');

    if (savedTheme === 'dark' || savedTheme === 'light') {
      setTheme(savedTheme);
      document.documentElement.setAttribute('data-theme', savedTheme);
      return;
    }

    document.documentElement.setAttribute('data-theme', 'light');
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';

    setTheme(nextTheme);
    document.documentElement.setAttribute('data-theme', nextTheme);
    localStorage.setItem('app-theme', nextTheme);
  };

  return { theme, toggleTheme };
}

export default useTheme;