import React from 'react'
import PropTypes from 'prop-types'
import '../styles/youtube.css'

const YoutubeEmbed = ({ embedId, setYoutube }) => (
  <div className='video-responsive'>
    <button className='close-youtube' onClick={() => setYoutube(false)}>
      Close Video
    </button>
    <iframe
      width='1280'
      height='640'
      src={`https://www.youtube.com/embed/${embedId}`}
      frameBorder='0'
      allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
      allowFullScreen
      title='Embedded youtube'
    />
  </div>
)

YoutubeEmbed.propTypes = {
  embedId: PropTypes.string.isRequired,
}

export default YoutubeEmbed
