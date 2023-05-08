import {Component} from 'react'
import Cookies from 'js-cookie'
import FailureView from '../FailureView'
import Loading from '../Loading'
import TrendingNow from '../TrendingNow'
import Originals from '../Originals'

import Header from '../Header'
import Footer from '../Footer'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    randomHomePagePoster: {},
  }

  componentDidMount() {
    this.getRandomHomePagePoster()
  }

  getRandomHomePagePoster = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const jwtToken = Cookies.get('jwt_token')
    const homeApi = 'https://apis.ccbp.in/movies-app/trending-movies'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(homeApi, options)

    if (response.ok === true) {
      const data = await response.json()
      const fetchedData = data.results.map(eachMovie => ({
        id: eachMovie.id,
        backdropPath: eachMovie.backdrop_path,
        title: eachMovie.title,
        overview: eachMovie.overview,
        posterPath: eachMovie.poster_path,
      }))
      const randomNumber = Math.floor(Math.random() * fetchedData.length)

      const randomMovie = fetchedData[randomNumber]
      this.setState({
        randomHomePagePoster: randomMovie,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  onClickRetry = () => {
    this.getRandomHomePagePoster()
  }

  renderFailureView = () => <FailureView onClickRetry={this.onClickRetry} />

  renderLoadingView = () => <Loading />

  renderSuccessView = () => {
    const {randomHomePagePoster} = this.state

    const {title, backdropPath, overview} = randomHomePagePoster
    console.log(title)
    return (
      <div
        style={{backgroundImage: `url(${backdropPath})`}}
        className="home-page"
      >
        <Header />
        <div className="home-page-movie-container">
          <h1 className="movie-title">{title}</h1>
          <h1 className="over-view">{overview}</h1>
          <button type="button" className="play-btn">
            Play
          </button>
        </div>
      </div>
    )
  }

  renderHomePage = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <div className="bg-container">
          {this.renderHomePage()}
          <h1 className="side-heading">Trending Now</h1>
          <TrendingNow />
          <h1 className="side-heading">Originals</h1>
          <Originals />
          <Footer />
        </div>
      </>
    )
  }
}

export default Home
