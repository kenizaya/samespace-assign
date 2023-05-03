import React from 'react'
import logo from '../assets/logo.svg'
import { gql, useQuery } from '@apollo/client'

const GET_PLAYLISTS = gql`
  query {
    getPlaylists {
      id
      title
    }
  }
`

const Navigation = ({ setPlaylistId }) => {
  const { data, error, loading } = useQuery(GET_PLAYLISTS)
  if (loading) return <div>Loading...</div>
  if (error) return <div>Error! {error.message}</div>
  const { getPlaylists } = data

  return (
    <div className='bg-black h-screen w-[280px]'>
      <div className='w-[150px] h-[176px]'>
        <img src={logo} alt='spotifi logo' className='pb-8' />

        <ul className='text-white flex gap-4 flex-col font-basierCircle text-xl leading-[32px] cursor-pointer'>
          {getPlaylists.map(({ id, title }) => (
            <li onClick={() => setPlaylistId(id)} key={id}>
              {title}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Navigation
