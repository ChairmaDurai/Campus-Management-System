import { configureStore, combineReducers } from '@reduxjs/toolkit'
import userReducer from "./Reducer.js"
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist'
import storage from "redux-persist/lib/storage"
import campusSlice from './campusSlice.js'
import  buildingSlice  from './buildingSlice.js'


const persistConfig = { key: 'root', version: 1, storage }
const rootReducer = combineReducers({ user: userReducer, campus: campusSlice, building : buildingSlice })
const persistedReducer = persistReducer(persistConfig, rootReducer)
export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    })
})

export const persistor = persistStore(store)