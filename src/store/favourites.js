import { createReducer, createAsyncThunk, createAction } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = []

export const getAllFavs = createAsyncThunk('getAllFavs', (id, thunkAPI) => {
  //le paso id de usuario + movieId
  const { users } = thunkAPI.getState()
  return axios
    .get(`/api/favourites/all/${id}`, {
      params: {
        id: id,
      },
    })
    .then((res) => res.data)
    .then((favouriteCreated) => favouriteCreated[0].Favourites)
    .catch((err) => console.log(err))
})

export const cleanFavs = createAction('cleanFavs')

export const favouritesReducer = createReducer(initialState, {
  [getAllFavs.fulfilled]: (state, action) => action.payload,
  [cleanFavs]: (state, action) => (state = []),
})
