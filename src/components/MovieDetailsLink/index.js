import {Link} from 'react-router-dom'

import './index.css'

const MovieDetailsLink = props => {
  const {movieDetails} = props
  const {posterPath, title, id} = movieDetails
  return (
    <li>
      <Link to={`/movies/${id}`}>
        <img className="popular-img" alt={title} src={posterPath} />
      </Link>
    </li>
  )
}

export default MovieDetailsLink
