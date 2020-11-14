import React from 'react'
import { connect } from 'react-redux'
import { filterAnecdotes } from '../reducers/filterReducer'

const Filter = (props) => {
  
  const handleChange = (event) => {
    props.filterAnecdotes(event.target.value)
  }

  const handleClick = () => {
    props.filterAnecdotes('')
  }

  const style = {
    marginBottom: 10
  }

  return (
      <div style={style}>
        filter <input
          value={props.filter}
          onChange={handleChange} />
          <button onClick={() => handleClick()} >reset</button>
      </div>
  )
}

const mapStateToProps = (state) => {
  return { filter: state.filter }
}

const mapDispatchToProps = {
  filterAnecdotes
}

const ConnectedFilter = connect(mapStateToProps, mapDispatchToProps)(Filter)

export default ConnectedFilter
