import React, { useEffect } from 'react'
import Navigation from './components/Navigation'
import Sidebar from './components/Sidebar'
import Player from './components/Player'
// import GradientBackground from './components/GradientBackground'
// import Vibrant from 'node-vibrant'

const App = () => {
  const [playlistId, setPlaylistId] = React.useState(1)
  const [songs, setSongs] = React.useState([])
  const [currentSongIndex, setCurrentSongIndex] = React.useState(0)
  const [currentSong, setCurrentSong] = React.useState(songs[currentSongIndex])
  const [gradient, setGradient] = React.useState('black')
  console.log(currentSongIndex)

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

  return (
    <div
      className='pl-8 pt-8 flex h-screen'
      style={{ background: `${gradient}` }}
    >
      <Navigation setPlaylistId={setPlaylistId} playlistId={playlistId} />
      <Sidebar
        playlistId={playlistId}
        setSongs={setSongs}
        setCurrentSongIndex={setCurrentSongIndex}
        currentSongIndex={currentSongIndex}
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
      {/* {currentSong && <GradientBackground imageUrl={currentSong?.photo} />} */}
    </div>
  )
}

export default App
