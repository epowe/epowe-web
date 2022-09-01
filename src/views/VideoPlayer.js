import React from 'react'
import ReactPlayer from 'react-player'

const VideoPlayer = ({ playerRef, url }) => {
  return (
    <>
      <ReactPlayer 
        ref={playerRef}
        url={url}
        playing={false}
        muted={false}
        controls={true}
        width="100%"
        height="100%"
      />
    </>
  )
}

export default VideoPlayer