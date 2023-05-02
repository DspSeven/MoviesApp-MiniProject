import {Component} from 'react'

import './index.css'

import Cookies from 'js-cookie'

import Responsive from '../lineFormationPage'
import TopHome from '../topHomePage'
import Header from '../navBar'

const apiKey = 'bdeb82385f84755468ab85488a72351c'

class HomePage extends Component {
  state = {
    trending: [],
    topRated: [],
    original: [],
    singleTop: [],
    genreId: '',
  }

  componentDidMount() {
    this.trendingMovies(apiKey)
    this.topRatedMovies(apiKey)
    this.originalMovies(apiKey)
  }

  trendingMovies = async key => {
    const url = `https://api.themoviedb.org/3/trending/all/week?api_key=${key}`
    const options = {
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = data.results.map(result => ({
        backdropPath: result.backdrop_path,
        originalTitle: result.original_title || result.original_name,
        posterPath: result.poster_path,
        id: result.id,
      }))
      this.setState({trending: updatedData})
    }
  }

  clickImage = id => {
    this.setState({genreId: id}, this.imageDetails)
  }

  imageDetails = () => {
    const {genreId} = this.state
    console.log(genreId)
  }

  topRatedMovies = async () => {
    const url = 'https://apis.ccbp.in/movies-app/trending-movies'
    const token = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: token,
      },
    }
    const response = await fetch(url, options)
    console.log('top-rated-movies')
    console.log(response)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = data.results.map(result => ({
        backdropPath: result.backdrop_path,
        originalTitle: result.title,
        posterPath: result.poster_path,
        overview: result.overview,
        id: result.id,
      }))
      const singleData =
        updatedData[Math.floor(Math.random() * updatedData.length)]
      this.setState({topRated: updatedData, singleTop: singleData})
    }
  }

  originalMovies = async key => {
    const url = `https://api.themoviedb.org/3/discover/tv?api_key=${key}`
    const options = {
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = data.results.map(result => ({
        backdropPath: result.backdrop_path,
        originalTitle: result.name,
        posterPath: result.poster_path,
        id: result.id,
      }))
      this.setState({original: updatedData})
    }
  }

  render() {
    const {trending, topRated, original, singleTop} = this.state
    return (
      <div className="background">
        <Header />
        <TopHome dataList={singleTop} />
        <div>
          <Responsive
            heading="Trending Now"
            dataList={trending}
            clickImage={this.clickImage}
          />
          <Responsive
            heading="Top Rated"
            dataList={topRated}
            clickImage={this.clickImage}
          />
          <Responsive
            heading="Originals"
            dataList={original}
            clickImage={this.clickImage}
          />
        </div>
      </div>
    )
  }
}
export default HomePage
