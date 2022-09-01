import {Link} from 'react-router-dom'
import Header from '../Header'
import './index.css'

const Home = () => {
  const homePage = () => (
    <div className="informationContainer">
      <h1>Find The Job That Fits Your Life</h1>
      <p className="homeParagraph ">
        Millions of people are searching for jobs,salary information,company
        reviews.Find the job that fits your abilities and potential.
      </p>
      <Link className="link" to="/jobs">
        <button className="homeBtn" type="button">
          Find Jobs
        </button>
      </Link>
    </div>
  )

  return (
    <>
      <Header />
      <div className="HomeContainer">{homePage()}</div>
    </>
  )
}
export default Home
