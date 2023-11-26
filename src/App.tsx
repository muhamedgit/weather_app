import { useEffect, useState } from 'react';
import { getWeatherData } from './weather';
import './App.css';

function App() {
  interface HourlyData {
    temperature_2m: number[];
  }

  interface WeatherData {
    latitude: number;
    longitude: number;
    hourly: HourlyData;
  }

  const [weatherData, setWeatherData] = useState<WeatherData>();
  const [loading, setLoading] = useState<boolean>(true);

  const fetchWeatherData = async (latitude: number, longitude: number) => {
    try {
      const data = await getWeatherData(
        `?latitude=${latitude}&longitude=${longitude}`
      );
      setWeatherData(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            fetchWeatherData(latitude, longitude);
          },
          (error) => {
            console.error('Error getting geolocation', error);
            setLoading(false);
          }
        );
      } else {
        console.error('Geolocation is not supported by this browser.');
        setLoading(false);
      }
    };

    getLocation();
  }, []);

  return (
    <>
      <div>
        {loading ? (
          <p>Loading...</p>
        ) : weatherData ? (
          <div>
            <h2>Current Weather</h2>
            <p>
              Location: {weatherData.latitude}, {weatherData.longitude}
            </p>
            {weatherData.hourly && weatherData.hourly.temperature_2m && (
              <p>
                Temperature:{' '}
                {weatherData.hourly.temperature_2m[new Date().getHours() - 1]}{' '}
                °C
              </p>
            )}
          </div>
        ) : (
          <p>Weather information uavalibale.</p>
        )}
      </div>
    </>
  );
}

export default App;
