import React, { useEffect } from 'react'
import Playlist from './components/Playlist'
import SongList from './components/SongList'
import Player from './components/Player'
import useImageColor from './hooks/useImageColor'

const App = () => {
  const [playlistId, setPlaylistId] = React.useState(1)
  const [songs, setSongs] = React.useState([])
  const [currentSongIndex, setCurrentSongIndex] = React.useState(0)
  const [currentSong, setCurrentSong] = React.useState(songs[currentSongIndex])
  const [currentPlaylist, setCurrentPlaylist] = React.useState('For You')
  const [showMobile, setShowMobile] = React.useState(false)
  const [showPlaylist, setShowPlaylist] = React.useState(true)
  const { color, canvasRef } = useImageColor(currentSong?.photo)
  const gradientColor = `rgb(${color?.r}, ${color?.g}, ${color?.b})`

  useEffect(() => {
    setCurrentSong(songs[currentSongIndex])
  }, [currentSongIndex, songs])

  useEffect(() => {
    if (songs.length > 0) {
      setCurrentSong(songs[0])
      setCurrentSongIndex(0)
    }
  }, [songs])

  const handleWindowSizeChange = () => {
    setShowPlaylist(window.innerWidth >= 1350)
    setShowMobile(window.innerWidth <= 1350)
  }

  useEffect(() => {
    window.addEventListener('resize', handleWindowSizeChange)
    handleWindowSizeChange()

    return () => {
      window.removeEventListener('resize', handleWindowSizeChange)
    }
  }, [])

  return (
    <div
      style={{
        background: `linear-gradient(to right, rgba(${color.r},${color.g},${color.b}, 0.9), ${gradientColor})`,
      }}
      className={`px-8 pt-8 flex h-screen max-h-full overflow-hidden relative`}
    >
      <canvas ref={canvasRef} style={{ display: 'none' }} />

      {showPlaylist && (
        <Playlist
          setPlaylistId={setPlaylistId}
          playlistId={playlistId}
          setCurrentPlaylist={setCurrentPlaylist}
        />
      )}
      <div className='flex mx-auto h-screen flex-col lg:flex-row md:gap-10 md:overflow-x-hidden relative w-full'>
        <SongList
          playlistId={playlistId}
          setSongs={setSongs}
          setCurrentSongIndex={setCurrentSongIndex}
          currentSongIndex={currentSongIndex}
          gradientColor={gradientColor}
          showMobile={showMobile}
          setPlaylistId={setPlaylistId}
          currentPlaylist={currentPlaylist}
        />

        {songs.length !== 0 && currentSong && (
          <Player
            songs={songs}
            currentSongIndex={currentSongIndex}
            setCurrentSongIndex={setCurrentSongIndex}
            currentSong={currentSong}
            setCurrentSong={setCurrentSong}
          />
        )}
      </div>
    </div>
  )
}

export default App
