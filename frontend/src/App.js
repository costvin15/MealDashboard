import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'
import {ThemeProvider, createMuiTheme} from '@material-ui/core'
import {Helmet} from 'react-helmet'

import i18n from './lang'
import {
  Auth,
  Meals,
  Dashboard,
} from './pages'
import {user} from './helpers'

const ProtectedRoute = ({component: Component, ...rest}) => (
  <Route {...rest} render={(props) => (
    // TODO: Refactor this to support JWT
    user.isLogged() ? <Component {...props} /> : <Redirect to='/auth/login' />
  )} />
)

const App = () => {
  const theme = createMuiTheme({
    typography: {
      fontFamily: `'Inter', sans-serif`,
    },
    palette: {
      primary: {
        main: '#00547A',
      },
      secondary: {
        main: '#0095DA',
      },
      background: {
        default: '#eeeff1',
      },
    },
  })

  return (
    <ThemeProvider theme={theme}>
      <Helmet>
        <title>{i18n.t('appname')}</title>
      </Helmet>
      <Router>
        <Switch>
          <Route path='/auth' component={Auth} />
          <Route path='/meals/:id' component={Meals} />
          <ProtectedRoute exact path='/' component={Dashboard} />
        </Switch>
      </Router>
    </ThemeProvider>
  )
}

export default App
