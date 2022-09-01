import {Component} from 'react'
import Cookies from 'js-cookie'
import {Link} from 'react-router-dom'
import {MdRoom} from 'react-icons/md'
import {BsSearch, BsStarFill, BsFillBriefcaseFill} from 'react-icons/bs'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiStatus = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  failure: 'FAILURE',
  success: 'SUCCESS',
}

class Jobs extends Component {
  state = {
    profile: {},
    technologies: [],
    type: [],
    salary: '',
    search: '',
    status: apiStatus.initial,
    profileStatus: apiStatus.initial,
  }

  componentDidMount = () => {
    this.userProfile()
  }

  userProfile = async () => {
    this.setState({profileStatus: apiStatus.inProgress})
    const url = 'https://apis.ccbp.in/profile'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(url, options)
    const profile = await response.json()

    if (response.ok === true) {
      const updateProfile = {
        name: profile.profile_details.name,
        profileImageUrl: profile.profile_details.profile_image_url,
        shortBio: profile.profile_details.short_bio,
      }
      this.setState(
        {profile: updateProfile, profileStatus: apiStatus.success},
        this.languages,
      )
    } else {
      this.setState({profileStatus: apiStatus.failure}, this.language)
    }
  }

  languages = async () => {
    this.setState({status: apiStatus.inProgress})
    const {type, salary, search} = this.state
    const listType = type.join()
    const url = `https://apis.ccbp.in/jobs?employment_type=${listType}&minimum_package=${salary}&search=${search}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      const updateData = data.jobs.map(each => ({
        id: each.id,
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        jobDescription: each.job_description,
        location: each.location,
        packagePerAnnum: each.package_per_annum,
        rating: each.rating,
        title: each.title,
      }))
      this.setState({technologies: updateData, status: apiStatus.success})
    } else {
      this.setState({status: apiStatus.failure})
    }
  }

  updateSalary = e => {
    this.setState({salary: e.target.value}, this.languages)
  }

  updateType = e => {
    const {type} = this.state
    this.setState({type: [...type, e.target.value]}, this.languages)
  }

  getProfile = () => (
    <div>
      <div className="profileCard">{this.getProfileData()}</div>
      <hr className="h-line" />
      <h1 className="selectHeading">Type of Employment</h1>

      <ul className="u-list">
        {employmentTypesList.map(each => (
          <li className="checkBox list" key={each.employmentTypeId}>
            <input
              className="check"
              value={each.employmentTypeId}
              id={each.employmentTypeId}
              type="checkbox"
              onChange={this.updateType}
            />
            <label htmlFor={each.employmentTypeId} className="subSelectItem">
              {each.label}
            </label>
          </li>
        ))}
      </ul>
      <hr className="h-line" />
      <h1 className="selectHeading">Salary Range</h1>
      <ul className="u-list">
        {salaryRangesList.map(salary => (
          <li className="checkBox list" key={salary.salaryRangeId}>
            <input
              className="check"
              name="salary"
              id={salary.salaryRangeId}
              type="radio"
              value={salary.salaryRangeId}
              onChange={this.updateSalary}
            />
            <label htmlFor={salary.salaryRangeId} className="subSelectItem">
              {salary.label}
            </label>
          </li>
        ))}
      </ul>
    </div>
  )

  searchInput = e => {
    this.setState({search: e.target.value})
  }

  onEnterKey = e => {
    if (e.key === 'Enter') {
      this.languages()
    }
  }

  searchData = () => {
    this.languages()
  }

  renderLanguages = () => {
    const {technologies} = this.state
    const isApplied = technologies.length
    return (
      <>
        {isApplied !== 0 ? (
          <ul className="u-list">
            {technologies.map(each => (
              <Link className="list" exact to={`/jobs/${each.id}`}>
                <li className="companyContainer" key={each.id}>
                  <div className="logoContainer">
                    <img
                      className="companyLogo"
                      src={each.companyLogoUrl}
                      alt="company logo"
                    />
                    <div className="title-star">
                      <h1 className="heading">{each.title}</h1>
                      <p className="starContainer">
                        <BsStarFill className="star" />
                        {each.rating}
                      </p>
                    </div>
                  </div>
                  <div className="jobDescription">
                    <div className="single-line">
                      <div className="locationContainer">
                        <MdRoom className="location" />
                        <p>{each.location}</p>
                      </div>
                      <div className="locationContainer">
                        <BsFillBriefcaseFill className="location" />
                        <p>{each.employmentType}</p>
                      </div>
                    </div>
                    <p>{each.packagePerAnnum}</p>
                  </div>
                  <hr className="h-line" />
                  <h1 className="heading">Description</h1>
                  <p className="para">{each.jobDescription}</p>
                </li>
              </Link>
            ))}
          </ul>
        ) : (
          <div className="noJobContainer">
            <>
              <img
                className="noJobImage"
                src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png "
                alt="no jobs"
              />
              <h1>No Jobs Found</h1>
              <p>We could not find any jobs. try other filters.</p>
            </>
          </div>
        )}
      </>
    )
  }

  loaded = () => <>{this.renderLanguages()}</>

  loading = () => (
    <div className="loader-container" testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  failure = () => (
    <div className="noJobContainer">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for</p>
      <button
        type="button"
        className="logoutBtn retryBtn"
        onClick={this.languages}
      >
        Retry
      </button>
    </div>
  )

  getCompleteData = () => {
    const {status} = this.state
    switch (status) {
      case apiStatus.inProgress:
        return this.loading()
      case apiStatus.failure:
        return this.failure()
      case apiStatus.success:
        return this.loaded()
      default:
        return null
    }
  }

  profileSuccess = () => {
    const {profile} = this.state
    const {name, profileImageUrl, shortBio} = profile
    return (
      <>
        <div>
          <img width={50} src={profileImageUrl} alt="profile" />
          <h1 className="userName">{name}</h1>
        </div>
        <p className="shortBio">{shortBio}</p>
        {}
      </>
    )
  }

  profileFailure = () => (
    <div className="failureProfile">
      <button
        type="button"
        className="logoutBtn retryBtn"
        onClick={this.getProfile}
      >
        Retry
      </button>
    </div>
  )

  getProfileData = () => {
    const {profileStatus} = this.state
    switch (profileStatus) {
      case apiStatus.failure:
        return this.profileFailure()
      case apiStatus.success:
        return this.profileSuccess()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="emptyContainer">
        <Header />
        <div className="bottomContainer">
          <div className="profileContainer">{this.getProfile()}</div>
          <div className="dataContainer">
            <div className="contentContainer">
              <div className="inputWidthStyle">
                <div className="inputContainer">
                  <input
                    type="search"
                    className="input"
                    placeholder="search"
                    onChange={this.searchInput}
                    onKeyDown={this.onEnterKey}
                  />
                  <button
                    className="searchBtn"
                    type="button"
                    testid="searchButton"
                    onClick={this.searchData}
                  >
                    <BsSearch className="search-icon" />
                  </button>
                </div>
              </div>
              {this.getCompleteData()}
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default Jobs
