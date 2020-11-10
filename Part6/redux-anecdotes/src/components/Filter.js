import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { filterAnecdotes } from '../reducers/filterReducer'

const Filter = () => {
  const filter = useSelector(state => state.filter)
  const dispatch = useDispatch()
  
  const handleChange = (event) => {
    dispatch(filterAnecdotes(event.target.value))
  }

  const handleClick = () => {
    dispatch(filterAnecdotes(''))
  }

  const style = {
    marginBottom: 10
  }

  return (
      <div style={style}>
        filter <input
          value={filter}
          onChange={handleChange} />
          <button onClick={() => handleClick()} >reset</button>
      </div>
      
  )
}

export default Filter
