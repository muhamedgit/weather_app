import './App.css';
import WeatherDisplay from './components/WeatherDisplay';
import { ModeToggle } from './components/mode-toggle';
import { ThemeProvider } from './components/theme-provider';

function App() {
  return (
    <>
      <ThemeProvider
        defaultTheme='dark'
        storageKey='vite-ui-theme'>
        <WeatherDisplay />
        <div className='fixed bottom-8 left-8 z-10'>
          <ModeToggle />
        </div>
      </ThemeProvider>
    </>
  );
}

export default App;
