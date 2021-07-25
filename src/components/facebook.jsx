import React from 'react'
import axios from 'axios'

function facebook() {
  const handleSubmit = (e) => {
    e.preventDefault()

    return fetch('/auth/facebook', {
      method: 'GET',
      mode: 'no-cors',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
      withCredentials: true,
      credentials: 'same-origin',
    })
      .then((res) => {
        console.log(res)
        return res.data
      })
      .catch((err) => console.log('estoy en error ffacebook', err))
  }
  return (
    <div>
      <div>
        {/* <div
          style={{ paddingBottom: '10px' }}
          className='fb-login-button'
          data-width=''
          data-size='large'
          data-button-type='continue_with'
          data-layout='default'
          data-auto-logout-link='false'
          data-use-continue-as='false'
        ></div> */}
        <button onClick={handleSubmit}>Login facebook</button>
      </div>
    </div>
  )
}

export default facebook
