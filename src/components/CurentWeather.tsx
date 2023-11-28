import React from 'react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

type CurrentWeather = {
  currentTemp: string;
  icon: string;
  text: string;
  location: string;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function CurrentWeather(props: any) {
  const location = props.location;
  const icon = props.icon;
  const text = props.text;
  const currentTemp = props.currentTemp;

  return (
    <div className='p-4 flex justify-center w-full'>
      <Card>
        <CardHeader>
          <CardTitle>Current Weather</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Location: {location}</p>
          <p>Temperature: {currentTemp} °C</p>
          <img
            className=' w-28'
            src={icon}
            alt=''
          />
        </CardContent>
        <CardFooter>
          <p>{text}</p>
        </CardFooter>
      </Card>
    </div>
  );
}

export default CurrentWeather;
