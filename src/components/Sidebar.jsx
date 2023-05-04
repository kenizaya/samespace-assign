import React, { useEffect, useMemo } from 'react'
import Search from './Search'
import { gql, useQuery } from '@apollo/client'
import { formatTime } from '../utils/formatTime'
import Loader from './Loader'

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
const Sidebar = ({
  playlistId,
  setSongs,
  setCurrentSongIndex,
  currentSongIndex,
}) => {
  const [query, setQuery] = React.useState('')
  const [filteredSongs, setFilteredSongs] = React.useState([])
  const { data, error, loading } = useQuery(GET_SONGS, {
    variables: { playlistId: playlistId },
  })

  const getSongs = useMemo(() => {
    return data?.getSongs || []
  }, [data])

  const handleClick = (index) => {
    setSongs(getSongs)
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

  return (
    <div className='h-screen max-h-[862px] mx-auto w-full sm:w-[432px] overflow-y-scroll no-scrollbar'>
      <h2 className='text-white font-basierCircle font-bold text-2xl md:text-3xl leading-8'>
        For You
      </h2>
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
                _id === getSongs[currentSongIndex]?._id ? 'bg-gray-600' : ''
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

export default Sidebar
