import React from 'react'
import BnecdoteForm from './components/BnecdoteForm'
import AnecdoteList from './components/AnecdoteList'

const App = () => {
  return (
    <div>
      <h2>Anecdotes</h2>
      <AnecdoteList />
      <BnecdoteForm />
    </div>
  )
}

export default App
