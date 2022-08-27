import { configureStore } from '@reduxjs/toolkit'
import userReducer from "./Reducer.js"


export default configureStore({
  reducer: {
   user : userReducer
  },
})