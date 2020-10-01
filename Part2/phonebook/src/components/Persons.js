import React from 'react'

const Persons = (props) => {

  const getMatches = () => {

    let copyOfPersons = [...props.persons]
    let copyOfFilter = props.newFilter

    let personObjects = copyOfPersons.filter(s => s.name.toUpperCase()
      .includes(copyOfFilter.toUpperCase()))

    // Add this commented out code if no numbers should be shown before filtering
    /*
    if (copyOfFilter.length === 0) {
      return []
    }*/

    return personObjects
  }

  return (
    <div>
      {getMatches()
        .map(line => {
          return (
            <div key={line.id}>
              {line.name}
              {" "}
              {line.number}
              <button onClick={() => props.deleteperson(line.id, line.name)}>delete</button>
            </div>
          )
        })}
    </div>
  )
}

export default Persons
