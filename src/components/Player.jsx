import React, { useState, useEffect } from 'react'
import ReactPlayer from 'react-player/file'
import menu from '../assets/menu.svg'
import prev from '../assets/prev.svg'
import play from '../assets/play.svg'
import pause from '../assets/pause.svg'
import next from '../assets/next.svg'
import speaker from '../assets/speaker.svg'

function Player({ songs, currentSongIndex, setCurrentSongIndex }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [played, setPlayed] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)

  console.log(played)

  const currentSong = songs[currentSongIndex]
  const { title, artist, photo, url } = currentSong

  const handlePlayPause = () => {
    setIsPlaying((prev) => !prev)
  }

  const handleTimeUpdate = (e) => {
    setCurrentTime(e.target.currentTime)
    setDuration(e.target.duration)
  }

  const handlePrevious = () => {
    if (currentSongIndex > 0) {
      setCurrentSongIndex((prev) => prev - 1)
    }
  }

  const handleNext = () => {
    if (currentSongIndex < songs.length - 1) {
      setCurrentSongIndex((prev) => prev + 1)
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
    <div className='flex flex-col ml-[162px] items-center w-full max-w-[480px] h-full max-h-[700px] '>
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
          className='w-[480px] h-[480px] object-contain rounded-lg mr-4 mb-6'
        />
      </div>

      <div className='h-[6px] w-full bg-white bg-opacity-20 cursor-pointer rounded-2xl'>
        <div
          className='h-[6px] bg-white rounded-2xl'
          style={{ width: `${played}%` }}
        ></div>
      </div>

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
      <ReactPlayer
        url={url}
        onProgress={({ played, playedSeconds }) => {
          setPlayed(played * 100)
        }}
        playing={isPlaying}
        controls={false}
      />
    </div>
  )
}

export default Player
