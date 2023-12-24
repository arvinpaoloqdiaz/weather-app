import "../App.css"
import SearchBar from "../components/SearchBar";
import Result from "../components/Result";
import {useState, useEffect} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesLeft } from '@fortawesome/free-solid-svg-icons';
import {Container} from "react-bootstrap";

export default function Home(){
	const [hasResult, setHasResult] = useState(false);
	const [data, setData] = useState({});
	function clearResult(e){
		e.preventDefault();
		setHasResult(false);
		setData({});

	}
	return(
		<div className="main-container">
			<h1>What's the weather, pare?</h1>
			<SearchBar setHasResult={setHasResult} setData={setData}/>
			{
				(hasResult)?
				<Container fluid className="position-relative">
				<hr/>
				<button className="back-button" onClick={e => clearResult(e)}><FontAwesomeIcon icon={faAnglesLeft} className="back-icon"/></button>
				<Result data={data}/>
				</Container>
				:
				<></>
			}
		</div>
	)
}