import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Countries = (props) => {

  const getMatches = () => {

    let copyOfCountries = [...props.countries]
    let copyOfFilter = props.newFilter

    let countriesObjects = copyOfCountries.filter(s => s.name.toUpperCase()
      .includes(copyOfFilter.toUpperCase()))

    if (copyOfFilter.length === 0) {
      return []
    }

    return countriesObjects
  }

  return (
    <div>
      <ShowMatches getmatches={getMatches()} setNewFilter={props.setNewFilter} />
    </div>
  )
}

const ShowMatches = (props) => {

  const handleShowClick = (name) => {
    let copyOfName = name
    props.setNewFilter(copyOfName)
  }

  if (props.getmatches.length > 10) {
    return ("Too many matches, specify another filter")
  }

  if (props.getmatches.length === 1) {
    return <ShowOneMatch getmatches={props.getmatches} />
  }

  return <ShowAllMatches getmatches={props.getmatches} handleShowClick={handleShowClick} />
}

const ShowAllMatches = (props) => {
  return (
    props.getmatches
      .map(line => {
        return (
          <div key={line.name}>
            {line.name}
            <button onClick={() => props.handleShowClick(line.name)}>show</button>
          </div>
        )
      })
  )
}

const ShowOneMatch = (props) => {
  const API_KEY = process.env.REACT_APP_API_KEY;
  return (
    props.getmatches
      .map(line => {
        return (
          <div key={line.name}>
            <h1>{line.name}</h1>
            <div>capital {line.capital}</div>
            <div>population {line.population}</div>
            <h3>Spoken languages</h3>
            <ul>
              <>{line.languages.map(language => <li key={language.name}> {language.name}</li>)}</>
            </ul>
            <div>
              <img style={{ height: 100 }}
                src={line.flag}
                alt="Country flag"
              />
            </div>
            <h3>
              Weather in {line.capital}
            </h3>
            <div style={{fontWeight: "bold"}}>
              <ShowWeather apiKey={API_KEY} cityName={line.capital} />
            </div>
          </div>
        )
      })
  )
}

const ShowWeather = (props) => {
  let [responseObj, setResponseObj] = useState({});

  useEffect(() => {
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${props.cityName}&appid=${props.apiKey}`)
      .then(response => {
        setResponseObj(response.data)
      })
  }, [props.cityName, props.apiKey])

  return (
    <div>
      <div>
        {responseObj.cod === 200 ?
          <div>
            <div>temperature: {Math.round(responseObj.main.temp - 273.15)} &deg; celsius</div>
            <img src={`http://openweathermap.org/img/wn/${responseObj.weather[0].icon}@2x.png`} alt="Wheather Icon" />
        <div>wind: {responseObj.wind.speed} m/s </div>
        <div> humidity: {responseObj.main.humidity} %</div> 
          </div>
          : null
        }
      </div>
    </div>
  )
}

export default Countries
