import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import {useState, useEffect} from "react";

import SearchResults from "./SearchResults";

export default function SearchBar({setHasResult, setData}){
	const [query,setQuery] = useState("");
	const [isEmpty, setIsEmpty] = useState(true);
	const [result,setResult] = useState([]);
	const [isQueryEmpty, setIsQueryEmpty] = useState(true);

	function searchPlace(e,query){
		e.preventDefault();
		fetch(`${process.env.REACT_APP_SEARCH}&q=${query}`)
		.then(res => res.json())
		.then(data => {
			if((data.length !==0) || (typeof data !== "object")){
				setIsEmpty(false);
				setResult(data);
				console.log(data);
			}else{
				setIsEmpty(true);
			}
		})
		
		console.log(result)
	}
	function deleteQuery(e){
		e.preventDefault();
		setQuery("");
		setResult([]);
		setIsEmpty(true);
	}

	function displayResults(results){
		if(results.length !== 0 && results instanceof Array){
			let resArr = results.map(res => {
				return (
					<button key={res.id} className="search-entries" onClick={e => fetchPlace(e,res.url)}>
					<div className="name">{res.name}</div>
					<div className="details">{res.region}, {res.country}</div>
					</button>
				)
			})
			return resArr
		}else {
			setIsEmpty(true);
		}
	}

	function fetchPlace(e,url){
		fetch(`${process.env.REACT_APP_FORECAST}&q=${url}&days=10&aqi=yes&alerts=no`)
		.then(res => res.json())
		.then(data => {
			setHasResult(true);
			setData(data);
		})
		setIsEmpty(true);
		setIsQueryEmpty(true);
		setQuery("");
	}
	useEffect(() => {
		if(query !== ""){
			setIsQueryEmpty(false);
		}else{
			setIsQueryEmpty(true);
			setIsEmpty(true);
		}
	},[query])
	useEffect(()=>{

	},[result])
	return(
		<>
		<div className="input-wrapper">
			<input 
			type="text" 
			className="input-bar" 
			placeholder="ENTER A PLACE . . . "
			value={query}
			onChange={e => {setQuery(e.target.value)}}
			/>
			<button className="search-button" onClick={e => searchPlace(e,query)}><FontAwesomeIcon icon={faMagnifyingGlass} className="search-icon"/></button>
			{
				(isQueryEmpty)?
				<></>
				:
				<button className="delete-query" onClick={e => deleteQuery(e)}><FontAwesomeIcon icon={faCircleXmark} className="x-mark-icon"/></button>
			}
		</div>
		{
		(isEmpty)?
		<></>
		:
		<SearchResults displayResults={displayResults(result)}/>
		}
		</>
	)
}