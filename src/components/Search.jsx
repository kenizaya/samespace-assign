import React from 'react'
import searchIcon from '../assets/searchIcon.svg'
const Search = ({ setQuery }) => {
  return (
    <div className='mb-[41px] mt-[33px] w-full'>
      <div className='relative mb-4 flex w-full max-w-[420px] flex-wrap items-center'>
        <input
          type='search'
          className='relative placeholder:opacity-60 h-12 rounded-lg m-0 block w-[1px] min-w-0 flex-auto bg-clip-padding px-4 py-[0.25rem] text-base font-normal leading-[1.6] text-white outline-none transition duration-200 ease-in-out border-none bg-gray-800'
          placeholder='Search Song, Artist'
          aria-label='Search'
          aria-describedby='button-addon2'
          onChange={() => setQuery(event.target.value)}
        />

        <span
          className='absolute right-[1px] bottom-[0.1] input-group-text flex items-center whitespace-nowrap rounded px-3 py-1.5 text-center text-base font-normal text-neutral-700 dark:text-neutral-200'
          id='basic-addon2'
        >
          <img src={searchIcon} alt='search icon' />
        </span>
      </div>
    </div>
  )
}

export default Search
