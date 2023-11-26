import axios from 'axios';

const url = 'https://api.open-meteo.com/v1/forecast';

export const getWeatherData = async (location: string) => {
  try {
    const response = await axios.get(`${url}${location}&hourly=temperature_2m`);
    return response.data;
  } catch (error) {
    console.error('Erorr fetching data', error);
  }
};
