import { createReducer, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
const API_KEY = 'b27721ee'
const url = `https://www.omdbapi.com/?apikey=b27721ee&s=`
const INITIAL_URL = `https://www.omdbapi.com/?apikey=${API_KEY}&s=flash`

const initialState = []

//sacar

export const searchMoviesRequest = createAsyncThunk(
  'searchRequest',
  (info, thunkAPI) => {
    let { searchTerm, type, page = 1 } = info
    searchTerm = searchTerm.split(' ').join('_')
    let searchURL = ''
    type === 'all'
      ? (searchURL = url + searchTerm + '&page=' + page)
      : (searchURL = url + searchTerm + '&type=' + type + '&page=' + page)

    return axios(searchURL)
      .then((res) => res.data)
      .then((movies) => {
        if (movies.Response === 'False') return { Search: false }

        return { ...movies, searchTerm, type }
      })
      .catch((err) => console.log(err))
  }
)

export const moviesReducer = createReducer(initialState, {
  [searchMoviesRequest.fulfilled]: (state, action) => action.payload,
})
