import React, { useEffect } from 'react'
import Search from './Search'
import { gql, useQuery } from '@apollo/client'
import { formatTime } from '../utils/formatTime'

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
const Sidebar = ({ playlistId, setSongs, setCurrentSongIndex }) => {
  const { data, error, loading } = useQuery(GET_SONGS, {
    variables: { playlistId: playlistId },
  })

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error! {error.message}</div>
  const { getSongs } = data

  const handleClick = (index) => {
    setSongs(getSongs)
    setCurrentSongIndex(index)
  }

  return (
    <div className='h-full max-h-[862px] w-[432px] overflow-y-scroll no-scrollbar'>
      <h2 className='text-white font-basierCircle font-bold text-[32px] leading-8'>
        For You
      </h2>
      <Search />
      <ul className='text-white flex gap-4 flex-col font-basierCircle text-xl leading-[32px]'>
        {getSongs.map((song, index) => {
          const { _id, title, artist, duration, photo } = song
          return (
            <li
              key={_id}
              className='w-full h-[80px] rounded-lg cursor-pointer flex '
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
                    <h3 className='text-lg leading-6'>{title}</h3>
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
