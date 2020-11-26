import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom'
import {ThemeProvider, createMuiTheme} from '@material-ui/core'
import {Helmet} from 'react-helmet'

import i18n from './lang'
import {
  Auth,
  Armas,
  Pontos,
  Guardas,
  Viaturas,
  Dashboard,
  Equipamentos,
  BoletimSimplificado,
  BoletimDeOcorrencia,
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
          <ProtectedRoute exact path='/' component={Dashboard} />
          <ProtectedRoute path='/guns' component={Armas} />
          <ProtectedRoute path='/keepers' component={Guardas} />
          <ProtectedRoute path='/toclockin' component={Pontos} />
          <ProtectedRoute path='/vehicles' component={Viaturas} />
          <ProtectedRoute path='/equipments' component={Equipamentos} />
          <ProtectedRoute path='/occurrencereport' component={BoletimDeOcorrencia} />
          <ProtectedRoute path='/simplifiedbulletin' component={BoletimSimplificado} />
          <ProtectedRoute component={Dashboard} />
        </Switch>
      </Router>
    </ThemeProvider>
  )
}

export default App
