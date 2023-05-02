import {BrowserRouter, Route, Switch} from 'react-router-dom'

import SignInForm from './components/signInFrom'

import HomePage from './components/homePage'

import Popular from './components/popularPage'

import AccountDetailsPage from './components/AccountDetailsPage'

import SearchBarPage from './components/SearchBarPage'

import MovieDetails from './components/movieDetailsPage'

import ProtectedRoute from './components/protectedRoute'

import NotFound from './components/notfound'

import './App.css'

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/signin" component={SignInForm} />
      <ProtectedRoute exact path="/" component={HomePage} />
      <ProtectedRoute exact path="/popular" component={Popular} />
      <ProtectedRoute
        exact
        path="/account-details"
        component={AccountDetailsPage}
      />
      <ProtectedRoute exact path="/search" component={SearchBarPage} />
      <ProtectedRoute exact path="/specific/:id" component={MovieDetails} />
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
)

export default App
