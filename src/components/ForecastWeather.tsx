import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function ForecastWeather({
	date,
	maxTemp,
	minTemp,
	icon,
	text,
}: {
	date: Date;
	maxTemp: number;
	minTemp: number;
	icon: string;
	text: string;
}) {
	const dayOfWeakByNum = new Date(date).getDay();
	const WeakDaysByName = [
		"Sunday",
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday",
	];

	return (
		<>
			<Card>
				<CardHeader>
					<CardTitle>{WeakDaysByName[dayOfWeakByNum]}</CardTitle>
				</CardHeader>
				<CardContent>
					<p>{new Date(date).toLocaleDateString()}</p>
					<p>High: {maxTemp}°C</p>
					<p>Low: {minTemp}°C</p>
					<img src={icon} alt={text} />
				</CardContent>
				<CardFooter>
					<p>{text}</p>
				</CardFooter>
			</Card>
		</>
	);
}

export default ForecastWeather;
