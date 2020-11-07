const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  
  let stateClone = { ...state }
  switch (action.type) {
    case 'GOOD':
      stateClone.good++
      return stateClone
    case 'OK':
      stateClone.ok++
      return stateClone
    case 'BAD':
      stateClone.bad++
      return stateClone
    case 'ZERO':
      return initialState
    default: return initialState
  }
}

export default counterReducer
