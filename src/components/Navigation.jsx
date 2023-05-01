import React from 'react'
import logo from '../assets/logo.svg'

const playlists = ['For You', 'Top Tracks', 'Favourites', 'Recently Played']

const Navigation = () => {
  return (
    <div className='bg-black h-screen pl-8 pt-8 w-[280px]'>
      <div className='w-[150px] h-[176px]'>
        <img src={logo} alt='spotifi logo' className='pb-8' />

        <ul className='text-white flex gap-4 flex-col font-basierCircle text-xl leading-[32px]'>
          {playlists.map((playlist) => (
            <li key={playlist}>{playlist}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Navigation
