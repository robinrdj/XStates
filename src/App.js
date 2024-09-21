import React,{useState, useEffect} from 'react';
import axios from "axios";

function App() {
  const [countries,setCountries] = useState([]);
  const [states,setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [country, setCountry] = useState("");
  const [city,setCity] = useState("");
  const [state, setState] = useState("");
  

  useEffect(()=>{
    async function setAllCountries(){
      try{
        const res = await axios.get("https://crio-location-selector.onrender.com/countries");
        setCountries(res.data);
      }catch(e){
        console.log(e);
      }
    }
    setAllCountries();
    
  },[]);

  async function setAllStates(country){
    try{
      const res = await axios.get(`https://crio-location-selector.onrender.com/country=${country}/states`);
      setStates(res.data);
    }catch(e){
      console.log(e);
    }

  }

  async function setAllCities(country,state){
    try{
      const res = await axios.get(`https://crio-location-selector.onrender.com/country=${country}/state=${state}/cities`);
      setCities(res.data);
    }catch(e){
      console.log(e);
    }

  }

 function handleCountryChange(e){
  setCountry(e.target.value);
  setAllStates(e.target.value);
  setCities([]);
  setCity("");
  setState("");
 }
 function handleStateChange(e){
   setState(e.target.value);
   setAllCities(country,e.target.value);
   setCity("")
 }

 function handleCityChange(e){
  setCity(e.target.value);
 }
  return (
    <div>
      <h1>Select Location</h1>
      <select value={country} onChange={handleCountryChange}>
        <option value="">Select Country</option>
        {countries.map((item)=>{
            return <option key={item} value={item}>{item}</option>
        })}
      </select>
      <select value={state} onChange={handleStateChange} disabled={country.length===0}>
      <option value="">Select State</option>
        {states.map((item)=>{
            return <option key={item} value={item}>{item}</option>
        })}
      </select>
      <select value={city} onChange={handleCityChange} disabled={state.length===0}>
      <option value="">Select City</option>
        {cities.map((item)=>{
          return <option key={item} value={item}>{item}</option>
        })}
      </select>
      {city && <h1>You selected {country}, {state}, {city}</h1>}
    </div>
  )
}

export default App;