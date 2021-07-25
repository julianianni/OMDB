//Imports
import React, { useState } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'

//components
import Navbar from '../components/Navbar'
import { useDispatch } from 'react-redux'
import { moviesRequest } from '../store/movies'
import Movies from '../components/Movies'
import LoginContainer from '../containers/LoginContainer'
import SingleSelection from '../components/SingleSelection'
import Favourites from '../components/Favourites'
import Home from '../components/Home'
import Users from '../components/Users'
import UserFavs from '../components/UserFavs'
import { userCookie } from '../store/user'
import axios from 'axios'

function Main() {
  const dispatch = useDispatch()
  const [isloading, setIsLoading] = useState(true)

  React.useEffect(() => {
    setIsLoading(false)

    return axios
      .get('/api/user/me')
      .then((res) => res.data)
      .then((user) => dispatch(userCookie(user)))
  }, [dispatch])

  return (
    <>
      <Navbar />
      <Switch>
        <Route exact path='/login' render={() => <LoginContainer />} />
        <Route exact path='/favourites' render={() => <Favourites />} />
        <Route exact path='/users' render={() => <Users />} />
        <Route path='/users/:id' render={() => <UserFavs />} />

        <Route
          exact
          path='/movies'
          render={() => (
            <Movies isloading={isloading} setIsLoading={setIsLoading} />
          )}
        />

        <Route
          path='/movies/:id'
          render={() => (
            <SingleSelection
              isloading={isloading}
              setIsLoading={setIsLoading}
            />
          )}
        />
        <Route path='/' render={() => <Home />} />

        <Redirect from='/' to='/' />
      </Switch>
    </>
  )
}

export default Main
