import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import '../styles/movies.css'
import { defaultImage } from '../assets/defaultimg'
import { searchMoviesRequest } from '../store/movies'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'

function Movies({ isloading, setIsLoading }) {
  const dispatch = useDispatch()
  const users = useSelector((state) => state.users)
  const [page, setPage] = useState(1)
  const [message, setMessage] = useState('')
  const [totalPages, setTotalPages] = useState(0)
  const [displayNext, setDisplayNext] = useState('')
  const [displayPrev, setDisplayPrev] = useState('hidden')

  const {
    searchTerm,
    type,
    totalResults,
    Search: movies,
  } = useSelector((state) => {
    if (state.movies === 'No Movie') return state.movies
    return state.movies
  }) || ''

  const handlePageClick = (totalResults, searchTerm, type) => {
    setTotalPages(Math.ceil(totalResults / 10))

    if (!searchTerm) return setMessage('search cannot be empty')
    if (type === 'next') {
      if (page < totalPages) {
        setPage((page) => page + 1)
        setDisplayNext('inline')
        setDisplayPrev('visible')
      } else {
        setDisplayPrev('none')
        setPage(1)
      }
    }
    if (type === 'prev') {
      if (page === 1) {
        setPage(1)
        setDisplayPrev('hidden')
      } else {
        setPage((page) => page - 1)
        setDisplayPrev('visible')
      }
    }
  }

  useEffect(() => {
    dispatch(searchMoviesRequest({ searchTerm, type, page }))
  }, [page, dispatch])

  // useEffect(() => {
  //   setPage(1)
  // }, [searchTerm])

  const popUp = () => {
    setTimeout(() => {
      setMessage('')
    }, 2000)
    return <h3 className='message'>{message}</h3>
  }

  const addToFavourite = (movieId, Title, Type, Year, user) => {
    const UserId = user.id
    if (!UserId) {
      console.log('THERE IS NO USER LOGGED')
      setMessage('you have to be logged in to add a favourite')
    } else {
      return axios({
        method: 'post',
        url: '/api/favourites/add',
        data: { UserId: UserId, movieId: movieId, Title, Type, Year },
      })
        .then((data) => {
          if (data.data === 'favourite already in user')
            setMessage('movie is already in your favourites')
          else {
            setMessage('Added to favourite')
            return data
          }
        })
        .catch((err) => console.log(err))
    }
  }

  return (
    <>
      {isloading ? (
        <h1>Loading............</h1>
      ) : (
        <div className='all'>
          {message && popUp()}

          {movies && (
            <button className='more-results'>
              <FaArrowLeft
                style={{ visibility: displayPrev }}
                className='more-results-icon'
                onClick={() =>
                  handlePageClick(totalResults, searchTerm, 'prev')
                }
              />
              <FaArrowRight
                style={{ display: displayNext }}
                className='more-results-icon'
                onClick={() =>
                  handlePageClick(totalResults, searchTerm, 'next')
                }
              />
            </button>
          )}

          <div className='movies-container'>
            {movies === false ? (
              <h1 className='no-results'>No results...</h1>
            ) : (
              movies &&
              movies.map((movie) => {
                const { Title, Poster, Type, Year, imdbID } = movie
                return (
                  <div key={imdbID} className='movie-container'>
                    {Title.length > 20 ? (
                      <h1 className='movie-title' style={{ fontSize: 16 }}>
                        {Title.slice(0, 35) + '...'}
                      </h1>
                    ) : (
                      <h1 className='movie-title'> {Title}</h1>
                    )}

                    <div className='sub-title'>
                      <h3>Year: {Year}</h3>
                      <h3>Type: {Type}</h3>
                    </div>
                    {Poster !== 'N/A' ? (
                      <img src={Poster} alt={Title} />
                    ) : (
                      <img src={defaultImage} alt={Title} />
                    )}
                    <div className='bottom-container'>
                      <Link className='bottom-btn' to={`/movies/${imdbID}`}>
                        more details
                      </Link>
                      <button
                        onClick={() =>
                          addToFavourite(imdbID, Title, Type, Year, users)
                        }
                        className='bottom-btn'
                      >
                        Add to favourite
                      </button>
                    </div>
                  </div>
                )
              })
            )}
          </div>
        </div>
      )}
    </>
  )
}

export default Movies
