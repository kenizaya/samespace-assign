import React from 'react'
import logo from '../assets/logo.svg'
import profile from '../assets/profile.png'
import { gql, useQuery } from '@apollo/client'

const GET_PLAYLISTS = gql`
  query {
    getPlaylists {
      id
      title
    }
  }
`

const Navigation = ({ setPlaylistId, playlistId }) => {
  const { data, error, loading } = useQuery(GET_PLAYLISTS)
  if (loading) return <div>Loading...</div>
  if (error) return <div>Error! {error.message}</div>
  const { getPlaylists } = data

  return (
    <div className='h-full w-[280px] flex flex-col justify-between'>
      <div className='w-[150px] h-[176px]'>
        <img src={logo} alt='spotifi logo' className='pb-8' />

        <ul className='text-white flex gap-4 flex-col font-basierCircle text-xl leading-[32px] cursor-pointer'>
          {getPlaylists.map(({ id, title }) => (
            <li
              onClick={() => setPlaylistId(id)}
              key={id}
              className={id === playlistId ? 'opacity-100' : 'opacity-40'}
            >
              {title}
            </li>
          ))}
        </ul>
      </div>
      <img
        src={profile}
        alt='profile'
        width={48}
        height={48}
        className='mb-8 cursor-pointer'
      />
    </div>
  )
}

export default Navigation
