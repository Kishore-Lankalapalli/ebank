import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import './index.css'

const Home = props => {
  const {history} = props

  const jwtToken = Cookies.get('jwt_token')

  if (jwtToken === undefined) {
    return <Redirect to="ebank/login" />
  }

  const onRemoveToken = () => {
    Cookies.remove('jwt_token')
    history.replace('/ebank/login')
  }

  return (
    <div className="home-container">
      <div className="header-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/ebank-logo-img.png"
          alt="website logo"
          className="logo-image"
        />
        <button onClick={onRemoveToken} type="button" className="logout-button">
          Logout
        </button>
      </div>
      <div className="banner-container">
        <h1 className="banner-section-heading">
          Your Flexibility, Our Excellence
        </h1>
        <img
          src="https://assets.ccbp.in/frontend/react-js/ebank-digital-card-img.png"
          alt="digital card"
          className="digital-card-image"
        />
      </div>
    </div>
  )
}

export default Home
