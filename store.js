import { createStore, compose, applyMiddleware } from 'redux'
import rootReducer from './reducers/index'
import thunk from 'redux-thunk'

const enhancers = compose(
  applyMiddleware(thunk) 
)

const store = createStore(rootReducer, {}, enhancers)

if (module.hot) {
  module.hot.accept('./reducers/', () => {
    const nextRoot = require('./reducers/index').default
    store.replaceReducer(nextRoot)
  })
}

export default store
