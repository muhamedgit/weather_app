import { useEffect, useState } from 'react';
import { getCurentWeatherData } from './Weather';
import '../App.css';

interface WeatherData {
  location: {
    name: string;
  };
  current: {
    temp_c: number;
    condition: {
      code: number;
      icon: string;
      text: string;
    };
  };
  forecast: {
    forecastday: [
      daynum: {
        date: Date;
        day: {
          maxtemp_c: number;
          mintemp_c: number;
          condition: {
            code: number;
            icon: string;
            text: string;
          };
        };
      }
    ];
  };
}

function WeatherDisplay() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeatherData = async (location: string) => {
      try {
        const data = await getCurentWeatherData(location);
        console.log('Received Weather Data:', data);
        setWeatherData(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error('Error fetching data:', error);
      }
    };

    const location = 'Maribor';
    console.log('Fetching weather for:', location);
    fetchWeatherData(location);
  }, []);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : weatherData ? (
        <div>
          <h2>Current Weather</h2>
          <div className='Curent-Container'>
            {weatherData.location && (
              <p>Location: {weatherData.location.name}</p>
            )}
            {weatherData.current && (
              <p>Temperature: {weatherData.current.temp_c} °C</p>
            )}
            {
              <div>
                <img
                  src={weatherData.current.condition.icon}
                  alt=''
                />
                <p>{weatherData.current.condition.text}</p>
              </div>
            }
          </div>

          <h2>Forecast Days</h2>
          <div className='forecast-container'>
            {weatherData.forecast &&
              weatherData.forecast.forecastday.map((day, index) => (
                <div
                  key={index}
                  className='forecast-day'>
                  <div>
                    <p>Date: {new Date(day.date).toLocaleDateString()}</p>
                    <p>Max Temp: {day.day.maxtemp_c} °C</p>
                    <p>Min Temp: {day.day.mintemp_c} °C</p>
                    <img
                      src={day.day.condition.icon}
                      alt=''
                    />
                    <p>{day.day.condition.text}</p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      ) : (
        <p>Weather information unavailable.</p>
      )}
    </div>
  );
}

export default WeatherDisplay;
