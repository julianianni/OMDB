import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getAllFavs } from '../store/favourites'
import { Link } from 'react-router-dom'
import axios from 'axios'
import '../styles/favourites.css'

function Favourites() {
  const user = useSelector((state) => state.users)
  const favourites = useSelector((state) => state.favourites)

  const keys = Object.keys(user)
  const dispatch = useDispatch()

  const removeFavourite = (movieId) => {
    return axios({
      method: 'delete',
      url: '/api/favourites/remove',
      data: {
        movieId: movieId,
        UserId: user.id,
      },
    })
      .then((res) => res.data)
      .then(() => dispatch(getAllFavs(user.id)))
      .catch((err) => console.log(err))
  }

  useEffect(() => {
    dispatch(getAllFavs(user.id))
  }, [dispatch, user])

  return (
    <div className='favs-container'>
      <h1 className='favs-title'>My favourites: </h1>
      {(!keys.length || user === 'OK') && (
        <h1 className='favs-movie-title'>
          Please log in to access your favourites
        </h1>
      )}
      {!favourites.length && (
        <h1 className='favs-movie-title'>
          {user.name} - you have No favourites...
        </h1>
      )}
      {favourites.map((movie) => {
        const { Title, Type, Year, movieId } = movie
        return (
          <div key={movieId} className='movie-favs-container'>
            <div className='left-favs'>
              <h1 className='favs-movie-title'>{Title}</h1>

              <h2 className='secondary-title-favs'>
                Type: {Type} - <span> Year: {Year}</span>
              </h2>
            </div>

            <div className='right-favs'>
              <Link to={`/movies/${movieId}`}>
                <button className=' bottom-btn'> more details</button>
              </Link>
              <button
                className='bottom-btn'
                onClick={() => removeFavourite(movieId)}
              >
                Remove Favourite
              </button>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Favourites
