import '@tmkelly28/tk-css'
import './index.css'

import React from 'react'
import ReactDOM from 'react-dom'
import {Provider, connect} from 'react-redux'
import store, {fetchPupsFromServer} from './store'

const Puppies = (props) => {
  const puppies = props.puppies
  const fetchPups = props.fetchPups

  return (
    <ul>
      {
        puppies
          .map(pup => <li key={pup.id}>{pup.name}</li>)
      }
      <button onClick={fetchPups}>Fetch those pups!</button>
    </ul>
  )
}

const mapStateToProps = (state) => {
  return {
    puppies: state.puppies
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchPups: () => {
      const thunk = fetchPupsFromServer()
      dispatch(thunk)
    }
  }
}

const ConnectedPuppies = connect(mapStateToProps, mapDispatchToProps)(Puppies)

ReactDOM.render(
  <Provider store={store}>
    <div id='demo' className='fill-xy bg-purple white column center-xy'>
      <div>
        <ConnectedPuppies />
      </div>
    </div>
  </Provider>,
  document.getElementById('app')
)
