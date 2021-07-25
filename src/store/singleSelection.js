import { createReducer, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const imdbID = 'tt1285016'
const SingleURL = `https://www.omdbapi.com/?apikey=b27721ee&i=`

const initialState = []

export const singleRequest = createAsyncThunk(
  'singleRequest',
  (id, thunkAPI) => {
    return axios(SingleURL + id)
      .then((res) => res.data)
      .then((movies) => movies)
      .catch((err) => console.log(err))
  }
)

export const SingleReducer = createReducer(initialState, {
  [singleRequest.fulfilled]: (state, action) => action.payload,
})
