import React from 'react'
import Navigation from './components/Navigation'
import Sidebar from './components/Sidebar'

const App = () => {
  const [playlistID, setPlaylistID] = React.useState(null)
  const [songUrl, setSongUrl] = React.useState('')

  return (
    <div className='pl-8 pt-8 bg-black flex'>
      <Navigation setPlaylistID={setPlaylistID} />
      <Sidebar playlistID={playlistID} setSongUrl={setSongUrl} />
    </div>
  )
}

export default App
