import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { alertsReducer } from './reducers/alertsReducer';
import { contactsReducer } from './reducers/contactsReducer';
const composeEnhancers = composeWithDevTools({});

const rootReducer = combineReducers({
  contactsReducer,
  alertsReducer,
})

const store = createStore(
  rootReducer,
  composeEnhancers(
    applyMiddleware(thunk)

  )
);

export default store