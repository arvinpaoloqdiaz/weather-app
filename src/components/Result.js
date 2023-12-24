import {useState, useEffect} from "react";
import {Row, Col, Container} from "react-bootstrap";
import Forecast from "./Forecast";
import sunrise from "../assets/images/sunrise.png";
import sunset from "../assets/images/sunset.png";

export default function Result({data}){

	return(
		<Container className="mt-3">
			<Row className="text-center">
				<h5>Current Weather</h5>
				<h3>{data.location.name}</h3>
			</Row>
			<Row>
				<Col xs={6}>
					<div className="fw-bold">{data.location.name}</div>
					<div>{data.location.region}, {data.location.country}</div>
				</Col>
				<Col xs={6} className="text-end">
					<div>Last Updated: {data.current.last_updated.split(" ")[1]}</div>
					<div>Timezone: {data.location.tz_id}</div>
				</Col>
			</Row>
			<Row >
				<Col xs={6} className="text-end">
					<span><img src={data.current.condition.icon} className="current-image"/></span>
					<span className="current-temp">{data.current.temp_c}&deg;C</span>
				</Col>
				<Col className="text-start align-self-center">
					<div>{data.current.condition.text}</div>
					<div>feels like {data.current.feelslike_c}&deg;C</div>
				</Col>
			</Row>
			<Row>
				<Col className="border-end text-center">
					<div>Humidity</div>
					<div>{data.current.humidity}%</div>
				</Col>
				<Col className="border-end text-center">
					<div>Wind</div>
					<div>{data.current.wind_kph}km/h {data.current.wind_dir}</div>
				</Col>
				<Col className="border-end text-center">
					<div>Pressure </div>
					<div>{data.current.pressure_mb}mb</div>
				</Col >
				<Col className="text-center">
					<div>Visibility </div>
					<div>{data.current.vis_km}km</div>
				</Col>				
			</Row>

			<Row className="text-center mt-3 container-fluid">
				<Col>
					<div className="fw-bold">Sunrise</div>
					<img src={sunrise} className="w-25"/>
					<div>{data.forecast.forecastday[0].astro.sunrise}</div>
				</Col>
				<Col>
					<div className="fw-bold">Sunset</div>
					<img src={sunset} className="w-25"/>
					<div>{data.forecast.forecastday[0].astro.sunset}</div>
				</Col>
			</Row>
			<Row>
				<Forecast data={data}/>
			</Row>
		</Container>
	)
}