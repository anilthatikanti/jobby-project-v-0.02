import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Header = props => {
  const logoutUser = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <div className="HeaderContainer">
      <ul className="header-un-list headerStraight">
        <Link className="link" to="/">
          <li className="listHeader">
            <img
              className="headerLogo"
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png "
              alt="website logo"
            />
          </li>
        </Link>
        <div className="headerStraight home-jobs-container">
          <Link className="link" to="/">
            <li className="listHeader">Home</li>
          </Link>

          <Link className="link" to="/jobs">
            <li className="listHeader">Jobs</li>
          </Link>
        </div>
        <button type="button" className="logoutBtn" onClick={logoutUser}>
          Logout
        </button>
      </ul>
    </div>
  )
}
export default withRouter(Header)
