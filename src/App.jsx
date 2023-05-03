import React from 'react'
import Navigation from './components/Navigation'
import Sidebar from './components/Sidebar'
import Player from './components/Player'

const App = () => {
  const [playlistID, setPlaylistID] = React.useState(null)
  const [songs, setSongs] = React.useState([])
  const [currentSongIndex, setCurrentSongIndex] = React.useState(0)

  return (
    <div className='pl-8 pt-8 bg-black flex'>
      <Navigation setPlaylistID={setPlaylistID} />
      <Sidebar
        playlistID={playlistID}
        setSongs={setSongs}
        setCurrentSongIndex={setCurrentSongIndex}
      />
      {songs.length !== 0 && (
        <Player songs={songs} currentSongIndex={currentSongIndex} />
      )}
    </div>
  )
}

export default App
