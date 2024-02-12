import {Container, Row, Col} from "react-bootstrap";
import {useState, useEffect} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faDroplet} from '@fortawesome/free-solid-svg-icons';

import "../App.css";

export default function Hourly({data}){
	function getTime(time){
		let datetime = time.time.split(" ")[1].split(":")[0];
		let currentTime = parseInt(datetime)%12
		let isPM = Math.floor(parseInt(datetime)/12)?'PM':
		'AM';
		if (currentTime == 0){
			return `12 ${isPM}`;
		}
		return `${currentTime} ${isPM} `;
	}
	return(
		<div className="hourly__forecast text-center p-3">
			<p>{getTime(data)}</p>
			<img src={data.condition.icon}/>
			<p>{data.temp_c}&deg; C</p>
			<p><FontAwesomeIcon icon={faDroplet}/> {data.chance_of_rain}%</p>
		</div>
	)
}