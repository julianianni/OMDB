import { createReducer, createAsyncThunk, createAction } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = []

export const getAllUsers = createAsyncThunk('getAllUsers', (id, thunkAPI) => {
  const { users } = thunkAPI.getState()

  if (users) {
    return axios
      .get(`/api/user/all/${users.id}`)
      .then((res) => res.data)
      .then((allUsers) => allUsers)
      .catch((err) => console.log('error', err))
  } else {
    return axios
      .get('/api/user/all')
      .then((res) => res.data)
      .then((allUsers) => allUsers)
      .catch((err) => console.log(err))
  }
})

export const allUsersReducer = createReducer(initialState, {
  [getAllUsers.fulfilled]: (state, action) => action.payload,
})
