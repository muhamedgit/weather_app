import axios from 'axios';

const API_URL = import.meta.env.VITE_WEATHER_APP_API_URL;
const API_KEY = import.meta.env.VITE_WEATHER_APP_API_KEY;

export const getCurentWeatherData = async (location: string) => {
  try {
    const response = await axios.get(
      `${API_URL}forecast.json?key=${API_KEY}&q=${location}&days=10&aqi=no&alerts=no`
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching data', error);
    throw error;
  }
};
