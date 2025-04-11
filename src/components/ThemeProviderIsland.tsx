import { ThemeProvider } from '../context/ThemeContext';
import { ThemeToggle } from './ThemeToggle';

export const ThemeProviderIsland = () => {
    return (
        <ThemeProvider>
            <ThemeToggle />
        </ThemeProvider>
    );
}
