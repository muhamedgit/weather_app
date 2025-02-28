import React, {useEffect, useState} from 'react';
import {getCurentWeatherData} from '../lib/WeatherService';
import '../App.css';
import ForecastWeather from './ForecastWeather';
import CurentWeather from './CurentWeather';
import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';

type ForecastDayData = {
  maxTemp: number;
  minTemp: number;
  icon: string;
  text: string;
  date: Date;
};

function WeatherDisplay() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [currentWeather, setCurrentWeather] = useState<any>();
  const [location, setLocation] = useState<string>('Maribor');
  const [forecast, setForecast] = useState<ForecastDayData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [cityInput, setCityInput] = useState('');

  const fetchWeatherData = async (location: string) => {
    try {
      const data = await getCurentWeatherData(location);
      setCurrentWeather(data.current);

      const forecastData: ForecastDayData[] = data.forecast.forecastday.map(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (item: any) => ({
          maxTemp: item.day.maxtemp_c,
          minTemp: item.day.mintemp_c,
          icon: item.day.condition.icon,
          text: item.day.condition.text,
          date: item.date,
        })
      );
      setForecast(forecastData);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchWeatherData(location);
  }, [location]);

  const handleSubmit = (event: {preventDefault: () => void}) => {
    event.preventDefault();
    setLocation(cityInput);
  };
  const handleChage = (event: {
    target: {value: React.SetStateAction<string>};
  }) => {
    setCityInput(event.target.value);
  };

  return (
    <>
      <div className='flex justify-center items-center gap-2 p-4'>
        <form onSubmit={handleSubmit}>
          <Input
            type='text'
            placeholder='City'
            value={cityInput}
            onChange={handleChage}
          />
          <Button
            type='submit'
            variant={'outline'}>
            Get Weather
          </Button>
        </form>
      </div>

      {!isLoading && (
        <div>
          <CurentWeather
            currentTemp={currentWeather?.temp_c}
            icon={currentWeather?.condition.icon}
            text={currentWeather?.condition.text}
            location={location}
          />

          <h2 className=' text-2xl p-4 font-semibold'>Weekly Forecast</h2>
          <div className=' flex justify-center flex-row gap-4'>
            {forecast.map((day: ForecastDayData, index: number) => (
              <ForecastWeather
                key={index}
                maxTemp={day.maxTemp}
                minTemp={day.minTemp}
                icon={day.icon}
                text={day.text}
                date={day.date}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default WeatherDisplay;
