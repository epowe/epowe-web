import React from 'react'
import ReactPlayer from 'react-player'

const VideoPlayer = ({playerRef}) => {
  return (
    <>
      <ReactPlayer 
        ref={playerRef}
        url="https://youtu.be/ueksOltZqH0"
        playing={true}
        muted={true}
        controls={true}
        width="100%"
        height="100%"
      />
    </>
  )
}

export default VideoPlayer