
import { Moon, Sun } from 'lucide-react';
import { TEXT } from '../config/globalStyles';
import { useTheme } from '../context/ThemeContext';

export const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            aria-label="Cambiar tema de la aplicación"
            className={`${TEXT.TEXT_DEFAULT} cursor-pointer p-2`}
            onClick={toggleTheme} 
        >
            {theme === 'light' ? <Moon size={24} /> : <Sun size={24} />}
        </button>
    );
}
