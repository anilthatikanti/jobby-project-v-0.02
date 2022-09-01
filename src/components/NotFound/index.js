import Header from '../Header'
import './index.css'

const NotFound = () => (
  <div className="emptyContainer">
    <Header />
    <div className="failurePage">
      <div>
        <img
          className="notFoundImage"
          src="https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png"
          alt="not found"
        />
        <h1>Page Not Found</h1>
        <p>we're sorry, the page you requested could not be found</p>
      </div>
    </div>
  </div>
)
export default NotFound
