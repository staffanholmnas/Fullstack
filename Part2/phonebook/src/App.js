import React, { useState, useEffect } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import phoneService from './services/phoneService'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [newMessage, setNewMessage] = useState(null)

  useEffect(() => {
    phoneService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const deletePerson = (id, name) => {
    if (window.confirm(`Delete ${name} ?`)) {
      let index = persons.map(find => find.id).indexOf(id)
      phoneService
        .deleteObject(id)
        .then()
        .catch(error => {
          const messageObject = {
            message: `${name} has already been deleted from server`,
            greenBorder: false
          }
          setNewMessage(messageObject)
          setTimeout(() => {
            setNewMessage(null)
          }, 5000)
        })
      const copyOfPersons = [...persons]
      copyOfPersons.splice(index, 1)
      setPersons(copyOfPersons)
      setNewName("")
      setNewNumber("")
    }
  }

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }

    if (persons.map(person =>
      person.name)
      .includes(newName)) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        let getID = persons.find(item => item.name === newName)
        let id = getID.id
        phoneService
          .update(id, personObject)
          .then(updatedPerson => {
            setPersons(persons.map(person => person.id !== id ? person : updatedPerson))
            setNewName("")
            setNewNumber("")
          })
          .catch(error => {
            const messageObject = {
              message: `Information of ${personObject.name} has already been removed from server`,
              greenBorder: false
            }
            setNewMessage(messageObject)
            setTimeout(() => {
              setNewMessage(null)
            }, 5000)
            setNewName("")
            setNewNumber("")
          })
      }
    }
    else {
      phoneService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName("")
          setNewNumber("")
          const messageObject = {
            message: `Added ${personObject.name}`,
            greenBorder: true
          }
          setNewMessage(messageObject)
          setTimeout(() => {
            setNewMessage(null)
          }, 5000)
        }).catch(error => {
          const message = error.response.data.error
          const messageObject = {
            message: message,
            greenBorder: false
          }
          setNewMessage(messageObject)
          setTimeout(() => {
            setNewMessage(null)
          }, 6000)
        })
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={newMessage} />
      <Filter value={newFilter} onChange={handleFilterChange} />
      <h3>add a new</h3>
      <PersonForm
        onSubmit={addPerson}
        nameValue={newName}
        nameOnChange={handleNameChange}
        numberValue={newNumber}
        numberOnChange={handleNumberChange}
      />
      <h3>Numbers</h3>
      <Persons persons={persons} newFilter={newFilter} deleteperson={deletePerson} />
    </div>
  )
}

export default App
