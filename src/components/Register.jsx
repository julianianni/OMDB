import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { UserRegister } from '../store/user'
import { useSelector, useDispatch } from 'react-redux'
import { Beetle as Button } from 'react-button-loaders'
import '../styles/login.css'

function Register({ setIsRegister, isRegister }) {
  const userRegistered = useSelector((state) => state.users)
  const dispatch = useDispatch()
  const [user, setUser] = useState('')
  const [btnState, setBtnState] = useState('')
  const [registerError, setRegisterError] = useState('')
  const [passwordMessage, setPasswordMessage] = useState('')
  const [validPass, setValidPass] = useState(false)
  let history = useHistory()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validPass) {
      return setPasswordMessage('password must be at least 8 characters')
    }

    setBtnState('loading')
    dispatch(UserRegister(user)).then(() => {
      setBtnState('')
      setPasswordMessage('')
      setValidPass('')
      setRegisterError('')
      history.goBack()
    })
  }
  useEffect(() => {
    if (userRegistered.id) {
      history.push('/movies')
      setRegisterError('')
    }
    if (userRegistered === 'OK') setRegisterError('')
    else {
      setRegisterError(userRegistered)
    }
  }, [userRegistered, history])

  const validatePass = (password) => {
    if (password.length < 8) {
      setPasswordMessage('password must be at least 8 characters')
      setValidPass(false)
    } else {
      setPasswordMessage('')
      setValidPass(true)
    }
  }

  const handleChange = (e) => {
    setRegisterError('')
    const { value, name } = e.target
    setUser({ ...user, [name]: value })
  }

  return (
    <div className='login-all'>
      <form className='form-container' onSubmit={handleSubmit}>
        <h3>Register</h3>
        <div className='form-group'>
          <label className='label-style'>User</label>
          <input
            type='text'
            required
            className='form-control'
            placeholder='Enter User...'
            name='username'
            onChange={handleChange}
          />
        </div>
        <div className='form-group'>
          <label className='label-style'>name</label>
          <input
            type='text'
            required
            className='form-control'
            placeholder='Enter Full Name...'
            name='name'
            onChange={handleChange}
          />
        </div>
        <div className='form-group'>
          <label className='label-style'>email</label>
          <input
            type='email'
            required
            className='form-control'
            placeholder='Enter email...'
            name='email'
            onChange={handleChange}
          />
        </div>
        <div className='form-group'>
          <label className='label-style'>Password</label>
          <input
            type='password'
            onBlur={(e) => validatePass(e.target.value)}
            required
            className='form-control'
            placeholder='Enter password'
            name='password'
            onChange={handleChange}
          />
          {passwordMessage && <h3 className='pop-up'>{passwordMessage}</h3>}
        </div>
        <div>
          {registerError && <h1 className='pop-up'> {registerError}</h1>}
        </div>
        <div className='credentials'>
          <Button className='btn-submit' state={btnState} disabled={!validPass}>
            Register
          </Button>

          <p className='link-click'>
            Already registered{' '}
            <a href='#' onClick={() => setIsRegister(!isRegister)}>
              log in?
            </a>
          </p>
        </div>
      </form>
    </div>
  )
}

export default Register
