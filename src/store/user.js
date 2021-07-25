import { createReducer, createAsyncThunk, createAction } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = ''

export const UserRegister = createAsyncThunk(
  'UserRegister',
  (userInfo, thunkAPI) => {
    return axios({
      method: 'post',
      url: '/api/user/add',
      data: userInfo,
    })
      .then((res) => res.data)
      .then((userCreated) => userCreated)
      .catch((err) => console.log(err))
  }
)
export const UserLogin = createAsyncThunk('UserLogin', (username, thunkAPI) => {
  return axios({
    method: 'put',
    url: '/api/user/signin',
    data: username,
  })
    .then((res) => res.data)
    .then((user) => user)
    .catch((err) => console.log(err))
})
export const UserLogout = createAsyncThunk('UserLogout', () => {
  return axios({
    method: 'put',
    url: '/api/user/signout',
  })
    .then((res) => res.data)
    .then((user) => user)
    .catch((err) => console.log(err))
})

export const userCookie = createAction('userCookie', (user) => ({
  payload: user,
}))

export const userReducer = createReducer(initialState, {
  [UserRegister.fulfilled]: (state, action) => action.payload,
  [UserLogin.fulfilled]: (state, action) => action.payload,
  [UserLogout.fulfilled]: (state, action) => action.payload,
  [userCookie]: (state, action) => action.payload,
})
