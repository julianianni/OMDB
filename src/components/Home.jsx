import React, { useState } from 'react'
import { data, news } from '../assets/fakedatahome'
import { Link } from 'react-router-dom'
import { AiOutlineArrowRight, AiOutlineArrowLeft } from 'react-icons/ai'
import { BsPlayFill } from 'react-icons/bs'
import '../styles/main.css'
import YoutubeEmbed from '../assets/youtube'

function Home() {
  const [index, setindex] = useState(0)
  const [youtube, setYoutube] = useState(false)

  const handleNextSlide = (count, type) => {
    if (type === 'next') {
      if (count === data.length - 1) setindex(0)
      else {
        setindex(index + 1)
      }
    } else {
      if (count === 0) setindex(data.length - 1)
      else {
        setindex(index - 1)
      }
    }
  }
  const {
    movieTitle,
    mainTitle,
    secondaryTitle,
    mainImg,
    secondaryImg,
    youtubeID,
    MovieId,
  } = data[index]

  const hansetYoutubedleYoutube = () => {
    setYoutube(true)
  }

  return (
    <div className='home-container'>
      <div className='arrow-container-right'>
        <AiOutlineArrowRight
          className='next-arrow'
          onClick={() => handleNextSlide(index, 'next')}
        />
      </div>
      <div className='arrow-container-left'>
        <AiOutlineArrowLeft
          className='next-arrow'
          onClick={() => handleNextSlide(index, 'prev')}
        />
      </div>

      <div className='shadow'>
        <span></span>
      </div>
      {youtube && <YoutubeEmbed embedId={youtubeID} setYoutube={setYoutube} />}
      <img className='home-main-img' src={mainImg} alt={movieTitle} />
      <img className='home-seconday-img' src={secondaryImg} alt={movieTitle} />
      <Link to={`/movies/${MovieId}`}>
        <h1 className='home-title-main'>{movieTitle}</h1>
      </Link>
      <h4 className='home-title-description'>{mainTitle}</h4>
      <h6 className='home-title-secondary' onClick={hansetYoutubedleYoutube}>
        <span>
          <BsPlayFill />
        </span>{' '}
        {secondaryTitle}
      </h6>
      <div className='news'>
        <h1 className='main-title-news'>Featured today</h1>
        <div className='container-news-title'>
          {news.map((info) => {
            return (
              <div className='news-container'>
                <h1 className='title-news'>{info.title}</h1>{' '}
                <img className='img-news' src={info.img} alt='' />
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Home
