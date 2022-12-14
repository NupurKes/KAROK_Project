/*
* Redux Library for space management.
* Store : space for space management.
* Action : A data which move from app to data
* Reducer : Action can not directly pass to the store
*           Type of action execute in Reducer
* Dispatch : To pass the Action to the reducer
*
* */
import {legacy_createStore as createStore, applyMiddleware, compose} from "redux";
import thunk from "redux-thunk";
import {reducers} from "../Reducer";


function saveToLocalStorage(store) {
  try {
    const serializedStore = JSON.stringify(store);
    window.localStorage.setItem('store', serializedStore);
  } catch (e) {
    console.log(e)
  }
}


function loadFromLocalStorage() {
  try {
    const serializedStore = window.localStorage.getItem('store');
    if (serializedStore === null)
    {
      return undefined;
    }
    return JSON.parse(serializedStore);

  }catch (e) {
    console.log(e);
    return undefined;
  }
}


const composeEnhancers = compose;
const persistedState = loadFromLocalStorage();

const store = createStore(reducers, persistedState, composeEnhancers(applyMiddleware(thunk)));

store.subscribe(()=>saveToLocalStorage(store.getState()));

export default store;