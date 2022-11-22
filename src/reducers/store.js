import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import Auth from './auth/reducer'
import Group from './group/reducer'
import Machine from './machine/reducer'
import Zone from './zone/reducer'

const reducer = combineReducers({
    Auth,
    Group,
    Machine,
    Zone
})

const store = configureStore({
    reducer,
})

export default store;