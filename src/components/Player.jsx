import React, { useState, useEffect } from 'react'
import ReactAudioPlayer from 'react-audio-player'
import menu from '../assets/menu.svg'
import prev from '../assets/prev.svg'
import play from '../assets/play.svg'
import pause from '../assets/pause.svg'
import next from '../assets/next.svg'
import speaker from '../assets/speaker.svg'

function Player({ songs, currentSongIndex }) {
  const [isPlaying, setIsPlaying] = useState(true)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)

  const currentSong = songs[currentSongIndex]
  console.log(currentSong)
  const { title, artist, photo, url } = currentSong

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const handleTimeUpdate = (e) => {
    setCurrentTime(e.target.currentTime)
    setDuration(e.target.duration)
  }

  const handlePrevious = () => {
    if (currentSongIndex > 0) {
      onPrevious(currentSongIndex - 1)
    }
  }

  const handleNext = () => {
    if (currentSongIndex < songs.length - 1) {
      onNext(currentSongIndex + 1)
    }
  }
  // const [isPlaying, setIsPlaying] = useState(false)
  // const [isMuted, setIsMuted] = useState(false)

  // useEffect(() => {
  //   const audioElement = document.getElementById('audio')
  //   audioElement.src = url

  //   if (isPlaying) {
  //     audioElement.play()
  //   } else {
  //     audioElement.pause()
  //   }
  // }, [currentSong, isPlaying])

  // function handlePlayPause() {
  //   setIsPlaying(!isPlaying)
  // }

  // function handleMuteUnmute() {
  //   setIsMuted(!isMuted)
  // }

  return (
    <div className='flex flex-col ml-[162px] items-center w-[480px] h-full max-h-[692.24px]'>
      <div className='flex flex-col gap-8'>
        <div className='flex flex-col gap-2'>
          <h2 className='text-white font-basierCircle font-bold text-[32px] '>
            {title}
          </h2>
          <p className='text-sm text-gray-500'>{artist}</p>
        </div>
        <img
          src={photo}
          alt={`${title} cover`}
          className='w-[480px] h-[480px] object-contain rounded-lg mr-4'
        />
      </div>
      {/* <ReactAudioPlayer
        src={url}
        autoPlay
        controls
        className='ml-4 flex-1'
        onPlay={handlePlayPause}
        onPause={handlePlayPause}
        onTimeUpdate={handleTimeUpdate}
        currentTime={currentTime}
        duration={duration}
      /> */}
      <div className='flex items-center mt-8 justify-between w-full'>
        <button>
          <img src={menu} alt='Menu' />
        </button>
        <div className='flex items-center gap-9'>
          <button onClick={handlePrevious}>
            <img src={prev} alt='Previous' />
          </button>
          <button onClick={handlePlayPause}>
            {isPlaying ? (
              <img src={pause} alt='Pause' />
            ) : (
              <img src={play} alt='Play' />
            )}
          </button>
          <button onClick={handleNext}>
            <img src={next} alt='Next' />
          </button>
        </div>

        <button>
          <img src={speaker} alt='Volume Up' />
          {/* <img src='mute' alt='Volume Mute' className='w-6 h-6' /> */}
        </button>
      </div>
    </div>
  )
}

export default Player
