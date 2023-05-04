import React, { useState, useEffect, useRef } from 'react'
import ReactPlayer from 'react-player/file'
import menu from '../assets/menu.svg'
import prev from '../assets/prev.svg'
import play from '../assets/play.svg'
import pause from '../assets/pause.svg'
import next from '../assets/next.svg'
import speaker from '../assets/speaker.svg'

function Player({
  songs,
  currentSongIndex,
  setCurrentSongIndex,
  setCurrentSong,
  currentSong,
}) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [played, setPlayed] = useState(0)
  const [seeking, setSeeking] = useState(false)
  const playerRef = useRef(null)

  useEffect(() => {
    setCurrentSong(songs[currentSongIndex])
  }, [currentSongIndex, songs])

  const { title, artist, photo, url } = currentSong

  // // useEffect(() => {
  //   setPlayed(0)
  // }, [currentSong])

  const handlePlayPause = () => {
    setIsPlaying((prev) => !prev)
  }

  const handlePrevious = () => {
    setPlayed(0)
    playerRef.current.seekTo(0)
    if (played <= 0.3 && currentSongIndex > 0) {
      setCurrentSongIndex((prev) => prev - 1)
    }
  }

  const handleNext = () => {
    if (currentSongIndex < songs.length - 1) {
      setCurrentSongIndex((prev) => prev + 1)
      setPlayed(0)
      playerRef.current.seekTo(0)
    }
  }

  const handleProgress = (state) => {
    if (!seeking) {
      setPlayed(state.played)
    }
  }

  const handleSeekChange = (e) => {
    const newTime = e.target.value
    setPlayed(newTime)
  }

  const handleSeekMouseDown = () => {
    setSeeking(true)
  }

  const handleSeekMouseUp = () => {
    setSeeking(false)
    playerRef.current.seekTo(played)
  }

  return (
    <div className='h-[200px] rounded-lg flex flex-col mx-auto xl:mx-[162px] items-center sm:w-full max-w-[360px] sm:max-w-[480px] xl:h-full max-h-[700px]'>
      <div className='flex w-full justify-between lg:flex-col gap-2 md:gap-8'>
        <div className='flex flex-col gap-1 md:gap-2'>
          <h2 className='text-white font-basierCircle font-bold text-lg md:text-xl lg:text-[32px]'>
            {title}
          </h2>
          <p className='text-xs lg:text-sm text-white opacity-60'>{artist}</p>
        </div>
        <img
          src={photo}
          alt={`${title} cover`}
          className='max-w-full w-[50px] h-[50px] lg:w-[480px] lg:h-[480px] object-contain rounded-lg mr-4 mb-6'
        />
      </div>

      <ReactPlayer
        ref={playerRef}
        url={url}
        playing={isPlaying}
        onProgress={handleProgress}
        controls={false}
      />
      <div className='h-[4px] w-full  bg-white bg-opacity-20 cursor-pointer rounded-2xl'>
        <input
          type='range'
          min='0'
          max='1'
          step='0.01'
          onMouseDown={handleSeekMouseDown}
          onMouseUp={handleSeekMouseUp}
          value={played}
          className='h-[4px] w-full absolute opacity-0 cursor-pointer max-w-[480px]'
          onChange={handleSeekChange}
        />
        <div
          className='h-[4px] bg-white rounded-2xl'
          style={{ width: `${played * 100}%` }}
        ></div>
      </div>

      <div className='flex items-center mt-6 md:mt-8 justify-between w-full'>
        <button>
          <img
            src={menu}
            alt='Menu'
            className='w-1/2 h-1/2 lg:w-full lg:h-full'
          />
        </button>
        <div className='flex items-center gap-6 md:gap-9'>
          <button onClick={handlePrevious}>
            <img
              src={prev}
              alt='Previous'
              className='w-1/2 h-1/2 lg:w-full lg:h-full'
            />
          </button>
          <button onClick={handlePlayPause}>
            {isPlaying ? (
              <img
                src={pause}
                alt='Pause'
                className='w-1/2 h-1/2 lg:w-full lg:h-full'
              />
            ) : (
              <img
                src={play}
                alt='Play'
                className='w-1/2 h-1/2 lg:w-full lg:h-full'
              />
            )}
          </button>
          <button onClick={handleNext}>
            <img
              src={next}
              alt='Next'
              className='w-1/2 h-1/2 lg:w-full lg:h-full'
            />
          </button>
        </div>

        <button>
          <img
            src={speaker}
            alt='Volume Up'
            className='w-1/2 h-1/2 lg:w-full lg:h-full'
          />
          {/* <img src='mute' alt='Volume Mute' className='w-6 h-6' /> */}
        </button>
      </div>
    </div>
  )
}

export default Player
