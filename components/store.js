import {createStore, applyMiddleware} from 'redux'
import logger from 'redux-logger'
import thunks from 'redux-thunk'
import axios from 'axios'

const GOT_PUPS = 'GOT_PUPS'

export const gotPups = (puppies) => ({
  type: GOT_PUPS,
  puppies
})

export const fetchPupsFromServer = () => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(gotPups([{id: 1, name: 'Cody'}]))
    }, 1000)
  }
}

const initialState = {
  puppies: []
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GOT_PUPS:
      return {
        ...state,
        puppies: action.puppies
      }
    default:
      return state
  }
}

const store = createStore(
  reducer,
  applyMiddleware(
    logger,
    thunks
      .withExtraArgument({axios})
  )
)

export default store
