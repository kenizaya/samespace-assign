import React from 'react'
import searchIcon from '../assets/searchIcon.svg'
const Search = () => {
  return (
    <div className='mb-[41px] mt-[33px] w-full'>
      <div className='relative mb-4 flex w-full max-w-[400px] flex-wrap items-stretch'>
        <input
          type='search'
          className='relative h-12 rounded-lg m-0 block w-[1px] min-w-0 flex-auto border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary'
          placeholder='Search Song, Artist'
          aria-label='Search'
          aria-describedby='button-addon2'
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
