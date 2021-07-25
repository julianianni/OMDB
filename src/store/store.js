import { configureStore } from '@reduxjs/toolkit'
import { moviesReducer } from './movies'
import { SingleReducer } from './singleSelection'
import { favouritesReducer } from './favourites'
import { allUsersReducer } from './allusers'
import { userReducer } from './user'

const store = configureStore({
  reducer: {
    movies: moviesReducer,
    users: userReducer,
    singleSelection: SingleReducer,
    favourites: favouritesReducer,
    allUsers: allUsersReducer,
  },
})

export default store
