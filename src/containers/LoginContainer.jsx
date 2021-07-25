import { useState } from 'react'

import React from 'react'

import Login from '../components/Login'
import Register from '../components/Register'

function LoginContainer() {
  const [isRegister, setIsRegister] = useState(false)
  return (
    <>
      {isRegister ? (
        <Register setIsRegister={setIsRegister} isRegister={isRegister} />
      ) : (
        <Login setIsRegister={setIsRegister} isRegister={isRegister} />
      )}
    </>
  )
}

export default LoginContainer
