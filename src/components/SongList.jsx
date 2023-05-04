import React, { useEffect, useMemo } from 'react'
import Search from './Search'
import { gql, useQuery } from '@apollo/client'
import { formatTime } from '../utils/formatTime'
import Loader from './Loader'
import profile from '../assets/profile.png'
import PlaylistMobile from './PlaylistMobile'

const GET_SONGS = gql`
  query GetPlaylist($playlistId: Int!) {
    getSongs(playlistId: $playlistId) {
      _id
      artist
      duration
      photo
      title
      url
    }
  }
`
const SongList = ({
  playlistId,
  setSongs,
  setCurrentSongIndex,
  currentSongIndex,
  gradientColor,
  showMobile,
  setPlaylistId,
  currentPlaylist,
}) => {
  const [query, setQuery] = React.useState('')
  const [filteredSongs, setFilteredSongs] = React.useState([])
  const [activeSongColor, setActiveSongColor] = React.useState('')
  const { data, error, loading } = useQuery(GET_SONGS, {
    variables: { playlistId: playlistId },
  })

  const getSongs = useMemo(() => {
    return data?.getSongs || []
  }, [data])

  useEffect(() => {
    setActiveSongColor(`bg-${gradientColor}`)
  }, [gradientColor])

  const handleClick = (index) => {
    setSongs(filteredSongs)
    setCurrentSongIndex(index)
  }

  useEffect(() => {
    if (getSongs) {
      setFilteredSongs(getSongs)

      if (query) {
        setFilteredSongs(
          getSongs.filter(
            (item) =>
              item.title
                .toLowerCase()
                .split(' ')[0]
                .startsWith(query.toLowerCase()) ||
              item.artist
                .toLowerCase()
                .split(' ')[0]
                .startsWith(query.toLowerCase())
          )
        )
      }
    }
  }, [query, getSongs])

  console.log(currentPlaylist)

  return (
    <div className='h-screen max-h-[862px] mx-auto w-full sm:w-[432px] max-w-[420px] overflow-y-scroll no-scrollbar'>
      <div className='flex w-full justify-between items-center'>
        {!showMobile && (
          <h2 className='text-white font-basierCircle font-bold text-2xl md:text-3xl leading-8'>
            {currentPlaylist?.title}
          </h2>
        )}
        {/* {showMobile && (
          <img
            src={profile}
            alt='profile'
            width={48}
            height={48}
            className='mb-8 cursor-pointer'
          /> */}
        {/* )} */}
      </div>
      {showMobile && (
        <PlaylistMobile playlistId={playlistId} setPlaylistId={setPlaylistId} />
      )}
      <Search setQuery={setQuery} />

      {loading && <Loader />}
      {error && <div>Error! {error.message}</div>}
      <ul className='text-white flex gap-4 flex-col font-basierCircle text-xl md:text-2xl leading-[32px]'>
        {filteredSongs.map((song, index) => {
          const { _id, title, artist, duration, photo } = song
          return (
            <li
              key={_id}
              className={`w-full h-[80px] rounded-lg cursor-pointer flex ${
                _id === filteredSongs[currentSongIndex]?._id
                  ? `${activeSongColor} opacity-70`
                  : ''
              }`}
              onClick={() => handleClick(index)}
            >
              <div className='w-full flex justify-between px-4 items-center'>
                <div className='flex items-center gap-4'>
                  <img
                    src={photo}
                    alt='song cover'
                    className='w-12 h-12 rounded-full'
                  />
                  <div>
                    <h3 className='text-base md:text-lg leading-6'>{title}</h3>
                    <h4 className='text-sm opacity-60'>{artist}</h4>
                  </div>
                </div>
                <span className='opacity-60 text-lg'>
                  {formatTime(duration)}
                </span>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default SongList
