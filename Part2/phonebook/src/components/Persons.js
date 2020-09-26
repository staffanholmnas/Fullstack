import React from 'react'

const Persons = (props) => {

    const getMatches = () => {
  
      let copyOfPersons = [...props.persons]
      let copyOfFilter = props.newFilter
  
      let personObjects = copyOfPersons.filter(s => s.name.toUpperCase()
        .includes(copyOfFilter.toUpperCase()))
  
      if (copyOfFilter.length === 0) {
        return []
      }
  
      return personObjects
    }
  
    return (
      <div>
      {getMatches()
        .map(line => {
          return (
            <div key={line.name}>
              {line.name}
              {" "}
              {line.number}
            </div>
          )
        })}
    </div>
    )
  }

export default Persons
