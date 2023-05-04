import { gql, useQuery } from '@apollo/client'
import Loader from './Loader'

const GET_PLAYLISTS = gql`
  query {
    getPlaylists {
      id
      title
    }
  }
`

const PlaylistMobile = ({ setPlaylistId, playlistId }) => {
  const { data, error, loading } = useQuery(GET_PLAYLISTS)

  return (
    <div className='w-full'>
      {loading && <Loader />}
      {error && <p className='text-white'>Error</p>}
      <ul className='text-white flex gap-5 justify-between items-center flex-wrap font-basierCircle text-lg cursor-pointer'>
        {data?.getPlaylists.map(({ id, title }) => (
          <li
            onClick={() => setPlaylistId(id)}
            key={id}
            className={`${
              id === playlistId ? 'opacity-100' : 'opacity-40'
            } w-[40%] border border-1 border-opacity-50 border-gray-300 rounded-lg text-center py-1`}
          >
            {title.length > 10 ? title.slice(0, 10) + '...' : title}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default PlaylistMobile
