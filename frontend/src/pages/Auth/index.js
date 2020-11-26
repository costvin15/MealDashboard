import React from 'react'
import {
  Switch,
  Route,
} from 'react-router-dom'

import Login from './Login'
import ForgotPassword from './ForgotPassword'
import SignUp from './Signup'

const AuthRoutes = ({match: {url}}) => (
  <Switch>
    <Route path={`${url}/login`} component={Login} />
    <Route path={`${url}/signup`} component={SignUp} />
  </Switch>
)

export default AuthRoutes
