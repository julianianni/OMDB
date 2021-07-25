import React, { useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import '../styles/users.css'
import { getAllUsers } from '../store/allusers'
import { useDispatch, useSelector } from 'react-redux'

function Users() {
  const dispatch = useDispatch()
  const users = useSelector((state) => state.allUsers)

  const removeUser = (id) => {
    return axios
      .delete(`/api/user/remove/${id}`)
      .then((res) => res.data)
      .then(() => dispatch(getAllUsers()))
      .catch((err) => console.log(err))
  }

  useEffect(() => {
    dispatch(getAllUsers())
  }, [dispatch])

  return (
    <div className='users-container'>
      {users.map((user) => {
        const { id, username, name } = user

        return (
          <div className='users' key={id}>
            <h1> Username: {username}</h1>
            <h2> Name: {name}</h2>
            <Link to={`/users/${id}`}>
              <button> See favs</button>
            </Link>
            <button onClick={() => removeUser(id)}> remove user</button>
          </div>
        )
      })}
    </div>
  )
}

export default Users
