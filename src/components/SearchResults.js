import {useState, useEffect} from "react";
import "../App.css";

export default function SearchResults({displayResults}){
	const [resultArray, setResultArray] = useState([]);
	
	useEffect(()=>{

		setResultArray(displayResults)
	},[])
	return(
		
		<div className="search-results">{resultArray}</div>

	)
}