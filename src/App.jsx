import React, { useEffect } from 'react'
import Navigation from './components/Navigation'
import Sidebar from './components/Sidebar'
import Player from './components/Player'
import useImageColor from './hooks/useImageColor'
// import GradientBackground from './components/GradientBackground'
// import Vibrant from 'node-vibrant'

const App = () => {
  const [playlistId, setPlaylistId] = React.useState(1)
  const [songs, setSongs] = React.useState([])
  const [currentSongIndex, setCurrentSongIndex] = React.useState(0)
  const [currentSong, setCurrentSong] = React.useState(songs[currentSongIndex])
  const [showMobile, setShowMobile] = React.useState(false)
  const [showPlaylist, setShowPlaylist] = React.useState(true)
  const { color, canvasRef } = useImageColor(currentSong?.photo)
  const gradientColor = `rgb(${color?.r}, ${color?.g}, ${color?.b})`

  useEffect(() => {
    setCurrentSong(songs[currentSongIndex])
  }, [currentSongIndex, songs])

  // useEffect(() => {
  //   Vibrant.from(currentSong?.photo)
  //     .getPalette()
  //     .then((palette) => console.log(palette))
  // console.log(currentSong.photo)
  // console.log('palette', err)
  // const colors = palette.Vibrant.getRgb()
  // console.log('colors', colors)
  // const gradient = `linear-gradient(to bottom, rgba(${colors[0]}, ${colors[1]}, ${colors[2]}, 1) 0%, rgba(${colors[0]}, ${colors[1]}, ${colors[2]}, 0) 100%)`
  // setGradient(gradient)
  // })
  // }, [currentSong])

  // const gradientBg = {
  //   backgroundImage: `linear-gradient(to bottom, rgba(124, 76, 76, 0.5), rgba(0,0,0,1)), url(${currentSong?.photo})`,
  //   backgroundRepeat: 'no-repeat',
  //   backgroundSize: 'cover',
  //   backdropFilter: 'blur(55px)',
  // }

  // console.log(gradient)

  const handleWindowSizeChange = () => {
    setShowPlaylist(window.innerWidth >= 1350)
  }

  useEffect(() => {
    window.addEventListener('resize', handleWindowSizeChange)
    return () => {
      window.removeEventListener('resize', handleWindowSizeChange)
    }
  }, [])

  console.log(color)

  return (
    <div
      style={{
        background: `linear-gradient(to right, rgba(${color.r},${color.g},${color.b}, 0.8), ${gradientColor})`,
      }}
      className={`px-8 pt-8 flex h-screen max-h-full overflow-hidden`}
    >
      <canvas ref={canvasRef} style={{ display: 'none' }} />

      {showPlaylist && (
        <Navigation setPlaylistId={setPlaylistId} playlistId={playlistId} />
      )}
      <div className='flex mx-auto h-screen flex-col lg:flex-row md:gap-10 md:overflow-x-hidden relative w-full'>
        <Sidebar
          playlistId={playlistId}
          setSongs={setSongs}
          setCurrentSongIndex={setCurrentSongIndex}
          currentSongIndex={currentSongIndex}
          gradientColor={gradientColor}
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

      {/* {currentSong && <GradientBackground imageUrl={currentSong?.photo} />} */}
    </div>
  )
}

export default App
