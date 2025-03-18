
import { useState, useEffect } from 'react';

type Theme = 'dark' | 'light';

export const useThemeToggle = () => {
  const [theme, setTheme] = useState<Theme>(() => {
    // Check if theme is stored in localStorage
    const savedTheme = localStorage.getItem('streamvibe-theme') as Theme | null;
    if (savedTheme) return savedTheme;
    
    // If no theme in localStorage, check user's system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    
    // Default to dark theme if no preference found
    return 'dark';
  });
  
  useEffect(() => {
    // Apply theme to document
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);
    
    // Save theme preference
    localStorage.setItem('streamvibe-theme', theme);
  }, [theme]);
  
  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'dark' ? 'light' : 'dark'));
  };
  
  return { theme, toggleTheme };
};
