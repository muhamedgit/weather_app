import { useEffect, useState } from 'react';
import { getCurentWeatherData } from '../lib/WeatherService';
import '../App.css';

type Current = {
  currentTemperature: string;
  icon: string;
  text: string;
};

type ForecastDay = {
  maxTemp: number;
  minTemp: number;
  icon: string;
  text: string;
  date: Date;
};

function WeatherDisplay() {
  const [currentWeather, setCurrentWeather] = useState<Current>();
  const [location, setLocation] = useState<string>('Maribor');
  const [forecast, setForecast] = useState<Array<ForecastDay>>();
  const [isLoading, setIsLoading] = useState(true);

  const fetchWeatherData = async (location: string) => {
    try {
      const data = await getCurentWeatherData(location);

      setCurrentWeather({
        currentTemperature: data.current.temp_c,
        icon: data.current.condition.icon,
        text: data.current.condition.text,
      });
      const forecast = data.forecast.forecastday;
      const newForecast: Array<ForecastDay> = [];

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      forecast.map((item: any) => {
        newForecast.push({
          maxTemp: item.day.maxtemp_c,
          minTemp: item.day.mintemp_c,
          icon: item.day.condition.icon,
          text: item.day.condition.text,
          date: item.date,
        });
      });
      setForecast(newForecast);
      console.log('Received Weather Data:', forecast);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    console.log('Fetching weather for:', location);
    fetchWeatherData(location);
  }, [location]);

  return (
    <>
      <form>
        <input
          type='text'
          onChange={(e) => {
            setLocation(e.target.value);
          }}
        />
      </form>
      {!isLoading && (
        <div>
          <h2>Current Weather</h2>
          <div className='Curent-Container'>
            <p>Location: {location}</p>
            <p>Temperature: {currentWeather?.currentTemperature} °C</p>
            <div>
              <img
                src={currentWeather?.icon}
                alt=''
              />
              <p>{currentWeather?.text}</p>
            </div>
          </div>

          <h2>Forecast Days</h2>
          <div className='forecast-container'>
            {forecast?.map((item: ForecastDay, itemIdx: number) => (
              <div
                key={itemIdx}
                className='forecast-day'>
                <div>
                  <p>Date: {new Date(item.date).toLocaleDateString()}</p>
                  <p>Max Temp: {item.maxTemp} °C</p>
                  <p>Min Temp: {item.minTemp} °C</p>
                  <img
                    src={item.icon}
                    alt=''
                  />
                  <p>{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default WeatherDisplay;
