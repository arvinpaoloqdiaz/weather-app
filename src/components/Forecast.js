import {Container, Row, Col} from "react-bootstrap";
import {useState, useEffect} from "react";
import sunrise from "../assets/images/sunrise.png";
import sunset from "../assets/images/sunset.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSnowflake,faDroplet} from '@fortawesome/free-solid-svg-icons';

import "../App.css";
export default function Forecast({data}){
	const [forecastArray, setForecastArray] = useState([]);
	function numToMonth(num){
		switch(num){
		case "01":
			return "January";
			break;
		case "02":
			return "February";
			break;
		case "03":
			return "March";
			break;
		case "04":
			return "April";
			break;
		case "05":
			return "May";
			break;
		case "06":
			return "June";
			break;
		case "07":
			return "July";
			break;
		case "08":
			return "August";
			break;	
		case "09":
			return "September";
			break;
		case "10":
			return "October";
			break;
		case "11":
			return "November";
			break;
		case "12":
			return "December";
			break;
		}
	}
	useEffect(() => {
		let forecast = data.forecast.forecastday.map((day,index) => {
			let forecastDate = day.date.split("-");
			let forecastMonth = numToMonth(forecastDate[1]);

			return (
				
				<Container key={day.date} className="forecast-card d-flex flex-column">
				<div className="text-center forecast-title">Day {index + 1}</div>
				<div className="text-center">{forecastMonth} {forecastDate[2]}, {forecastDate[0]}</div>
				<Row>
					<Col className="pe-0">
						<img src={day.day.condition.icon} className="forecast-image float-end me-0"/>
					</Col>
					<Col className="ps-0 align-self-center">
						<div className="forecast-temp">{day.day.avgtemp_c}&deg;C</div>
					</Col>
				</Row>
				
				<div className="text-center mt-3 fw-bold"><p>{day.day.condition.text}</p></div>
				<Row className="chances">
				{
					(day.day.daily_will_it_rain)?
					<Col>{day.day.daily_chance_of_rain}% <FontAwesomeIcon icon={faDroplet}/></Col>
					:
					<></>
				}
				{
					(day.day.daily_will_it_snow)?
					<Col>{day.day.daily_chance_of_snow}% <FontAwesomeIcon icon={faSnowflake}/></Col>
					:
					<></>
				}
				</Row>
				<hr className="mb-2"/>
				<div className="contain">
				<Row className="text-center">
					<Col>
						<div className="fw-bold">Humidity</div>
						<div>{day.day.avghumidity}%</div>
					</Col>
					<Col>
						<div className="fw-bold">Wind</div>
						<div>{day.day.maxwind_kph}km/h</div>
					</Col>
					<Col>
						<div className="fw-bold">Visibility</div>
						<div>{day.day.avgvis_km} km</div>
					</Col>
				</Row>
				<Row className="text-center">
				<Col>
					<p className="mb-0 fw-bold">Sunrise</p>
					<img src={sunrise} className="w-50"/>
					<p>{day.astro.sunrise}</p>
				</Col>
				<Col>
					<p className="mb-0 fw-bold">Sunset</p>
					<img src={sunset} className="w-50 m-0 p-0"/>
					<div>{day.astro.sunset}</div>
				</Col>
				</Row>
				</div>
				</Container>
		
			)
		})
		setForecastArray(forecast);
	},[data])
	return(
		<>
		<hr className="my-4"/>
		<h3 className="text-center mb-2">10-day Forecast</h3>
		<div className="forecast-container">{forecastArray}</div>
		</>
	)
}