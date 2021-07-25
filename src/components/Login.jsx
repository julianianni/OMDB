import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { GrGoogle, GrFacebook } from 'react-icons/gr'
import '../styles/login.css'

import { UserLogin } from '../store/user'
import { Beetle as Button } from 'react-button-loaders'

function Login({ setIsRegister, isRegister }) {
  const dispatch = useDispatch((state) => state.users)
  const userState = useSelector((state) => state.users)
  const [btnState, setBtnState] = useState('')

  const [user, setUser] = useState({
    username: '',
    password: '',
  })
  let history = useHistory()
  const [credentialsOk, setcredentialsOk] = useState(false)

  const handleChange = (e) => {
    const { value, name } = e.target
    setcredentialsOk(false)
    setUser((prevUser) => {
      return { ...prevUser, [name]: value }
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setBtnState('loading')

    setTimeout(() => {}, 2000)
    dispatch(UserLogin(user)).then(() => {
      setBtnState('')
      setcredentialsOk(true)
    })
  }

  useEffect(() => {
    if (userState['id']) {
      history.push('/movies')
    }
  }, [userState, history])

  return (
    <div className='login-all'>
      <form className='form-container' onSubmit={handleSubmit}>
        <h3>Log in</h3>

        <div className='form-group'>
          <label className='label-style'>User</label>
          <input
            type='text'
            className='form-control'
            placeholder='Enter username'
            name='username'
            value={user.username}
            onChange={handleChange}
          />
        </div>

        <div className='form-group'>
          <label className='label-style'>Password</label>
          <input
            type='password'
            className='form-control'
            placeholder='Enter password'
            name='password'
            value={user.password}
            onChange={handleChange}
          />
        </div>

        <Button className='btn-submit' state={btnState}>
          Sign in
        </Button>
        {credentialsOk && (
          <p className='pop-up'> Usuario o Password incorrecto</p>
        )}

        <div className='credentials'>
          <p className='forgot-password'>
            <a className='link-click' href='#'>
              Forgot password?
            </a>
          </p>
          <p className='forgot-password'>
            Don't have an account?{' '}
            <a
              href='#'
              className='link-click'
              onClick={() => setIsRegister(!isRegister)}
            >
              Register
            </a>
          </p>
          <div className='google-auth'>
            <button type='button' className='google-btn'>
              <a href='http://localhost:3001/auth/google'>
                {' '}
                Login with google{' '}
                <span>
                  {' '}
                  <GrGoogle />
                </span>
              </a>
            </button>
          </div>
          <div className='google-auth'>
            <button type='button' className='google-btn'>
              <a href='http://localhost:3001/auth/facebook'>
                {' '}
                Login with facebook{' '}
                <span>
                  {' '}
                  <GrFacebook />
                </span>
              </a>
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Login
