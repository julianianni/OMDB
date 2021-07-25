import React from 'react'
import '../styles/navbar.css'
import { useSelector, useDispatch } from 'react-redux'
import { UserLogout } from '../store/user'
import { Link } from 'react-router-dom'
import { cleanFavs } from '../store/favourites'
import Search from '../components/Search'

function Navbar() {
  const user = useSelector((state) => state.users)
  const dispatch = useDispatch()

  const { id, username } = user

  const handleLogOut = (e) => {
    dispatch(UserLogout())
    dispatch(cleanFavs())
    console.log('hice logout')
  }

  return (
    <nav className='navbar'>
      <h1 className='home-title'>
        <Link to='/'>OMDB</Link>
      </h1>
      <Search />
      <h1 className='test'>
        <Link to='/favourites'>My Favourites</Link>
      </h1>
      <h1>
        <Link to='/users'>Users</Link>
      </h1>
      <h1>
        {!id ? (
          <Link to='/login'> Log In</Link>
        ) : (
          <Link to='/' onClick={handleLogOut}>
            Log Out
          </Link>
        )}
      </h1>
      {id && <h4 className='home-title'> {`Hello ${username}!`} </h4>}
    </nav>
  )
}

export default Navbar
