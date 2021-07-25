import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { searchMoviesRequest } from '../store/movies'
import { useHistory } from 'react-router-dom'
import { BsSearch } from 'react-icons/bs'
import '../styles/search.css'

function Search() {
  const [searchTerm, setSearchTerm] = useState('')

  const [type, setType] = useState('all')
  const location = useLocation()
  const [message, setMessage] = useState('')
  let history = useHistory()

  const dispatch = useDispatch()

  const handleChange = (e) => {
    const { value } = e.target
    setMessage('')
    setSearchTerm(value)
  }

  const handleSelection = (e) => {
    const { value } = e.target
    setType(value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!searchTerm) return setMessage('search cannot be empty')
    else {
      dispatch(searchMoviesRequest({ searchTerm, type }))
      setSearchTerm('')
      if (location.pathname !== 'movies') history.push('/movies')
    }
  }

  return (
    <div className='topnav'>
      <form
        className='form'
        onSubmit={handleSubmit}
        onBlur={() => {
          setMessage('')
        }}
      >
        <select
          className='select'
          value={type}
          name='type'
          onChange={handleSelection}
        >
          <option value='all'>All</option>
          <option value='movie'>Movie</option>
          <option value='series'>Serie</option>
        </select>
        <input
          className='input'
          type='text'
          value={searchTerm}
          placeholder='Search...'
          onChange={handleChange}
        />
        <BsSearch
          className='search-icon'
          onClick={(e) => {
            handleSubmit(e)
            setTimeout(() => {
              setMessage('')
            }, 2000)
          }}
        />
      </form>
      {message && <h3 className='search-message'>{message}</h3>}
    </div>
  )
}

export default Search
