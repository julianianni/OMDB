import React, { useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { singleRequest } from '../store/singleSelection'
import '../styles/singleselection.css'

function SingleSelection({ isloading, setIsLoading }) {
  const { id } = useParams()
  const dispatch = useDispatch()
  const movie = useSelector((state) => state.singleSelection)
  const history = useHistory()
  const {
    Title,
    Year,
    Released,
    Runtime,
    Actors,
    Awards,
    Country,
    Director,
    Genre,
    Poster,
    imdbRating,
    imdbVotes,
  } = movie

  useEffect(() => {
    setIsLoading(true)
    dispatch(singleRequest(id)).then(() => setIsLoading(false))
  }, [dispatch, id, setIsLoading])

  return (
    <>
      {isloading ? (
        <div className='single-container'>
          <h1>Loading....</h1>
        </div>
      ) : (
        <div className='single-container'>
          <div className='left'>
            <h1> Title: {Title}</h1>
            <img src={Poster} alt={Title} />
          </div>
          <div className='info'>
            <h1>Year: {Year}</h1>
            <h1>Release: {Released}</h1>
            <h1> Duration: {Runtime}</h1>
            <h1>Actors: {Actors}</h1>
            <h1>Awards: {Awards}</h1>
            <h1>Director: {Director}</h1>
            <h1>Country: {Country}</h1>
            <h1>Genre: {Genre}</h1>
            <h1> Rating: {imdbRating}</h1>
            <h1>Votes: {imdbVotes}</h1>
          </div>
        </div>
      )}
      <button className='home' onClick={() => history.goBack()}>
        Go back
      </button>
    </>
  )
}

export default SingleSelection
