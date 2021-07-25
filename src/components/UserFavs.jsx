import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

function UserFavs() {
  const { id } = useParams()
  const [favs, setFavs] = useState([])
  const users = useSelector((state) => state.allUsers)

  const getFavsFromUser = () => {
    return users.filter((user) => id == user.id)
  }

  useEffect(() => {
    const users = getFavsFromUser()
    setFavs(...users)
  }, [users])

  const { Favourites, name } = favs

  return (
    <div className='userfavs-container'>
      <h1 style={{ color: 'white' }}> Favourites of {name} </h1>
      {Favourites && !Favourites.length && (
        <div className='fav-info-container'>
          <h3>User has no favourites...</h3>
        </div>
      )}
      {Favourites &&
        Favourites.map((favourite) => {
          const { Title, Type, Year, id, movieId } = favourite

          return (
            <div className='fav-info-container' key={id}>
              <Link to={`/movies/${movieId}`}>
                <h4> Title: {Title}</h4>
              </Link>
              <h4> Type: {Type}</h4>
              <h4> Year: {Year}</h4>
            </div>
          )
        })}
    </div>
  )
}

export default UserFavs
