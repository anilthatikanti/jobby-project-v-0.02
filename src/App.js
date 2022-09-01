import {Switch, Route, Redirect} from 'react-router-dom'
import Home from './components/Home'
import Jobs from './components/Jobs'
import LoginForm from './components/LoginForm'
import NotFound from './components/NotFound'
import JobItems from './components/JobItems'
import ProtectedRoute from './components/ProtectedRoute'
import './App.css'

// These are the lists used in the application. You can move them to any component needed.

// Replace your code here
const App = () => (
  <Switch>
    <Route exact path="/login" component={LoginForm} />
    <ProtectedRoute exact path="/" component={Home} />
    <ProtectedRoute exact path="/jobs" component={Jobs} />
    <ProtectedRoute exact path="/jobs/:id" component={JobItems} />
    <Route path="/bad-path" component={NotFound} />
    <Redirect to="/bad-path" />
  </Switch>
)

export default App
