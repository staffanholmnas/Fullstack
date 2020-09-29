import React from 'react'

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
      <ShowMatches getmatches={getMatches()} setNewFilter={props.setNewFilter}/>
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
  return (
    props.getmatches
      .map(line => {
        return (
          <div key={line.name}>
            <h1>{line.name}</h1>
            <div>capital {line.capital}</div>
            <div>population {line.population}</div>
            <h3>languages</h3>
            <ul>
              <>{line.languages.map(language => <li key={language.name}> {language.name}</li>)}</>
            </ul>
            <div>
              <img style={{ height: 100 }}
                src={line.flag}
                alt="Country flag"
              />
            </div>
          </div>
        )
      })
  )
}

export default Countries
