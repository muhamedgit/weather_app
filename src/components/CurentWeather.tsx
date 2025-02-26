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

function CurrentWeather({
  location,
  icon,
  text,
  currentTemp,
}: {
  location: string;
  icon: string;
  text: string;
  currentTemp: number;
}) {
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
