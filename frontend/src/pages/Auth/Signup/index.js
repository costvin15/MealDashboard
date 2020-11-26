import React, {useState} from 'react'
import {
  Typography,
  Input,
  Button,
} from '@material-ui/core'
import {Link, withRouter} from 'react-router-dom'

import {styles} from './styles'
import i18n from '../../../lang'
import Provider from './provider'
import {Dialogs} from '../../../components'

const Signup = ({history}) => {
  const [fullname, setFullname] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const performSignUp = () => {
    (async () => {
      try {
        if (email && password) {
          await Provider.performLogin({email, password})
          history.replace('/')
        } else {
          setError(true)
          setErrorMessage(i18n.t('enteryourdata'))
        }
      } catch (exception) {
        setError(true)
        setErrorMessage(i18n.t('checkyourcredentials'))
      }
    })()
  }

  return (
    <>
      <div style={styles.wrapper}>
        <div style={styles.container}>
          <Typography
            variant='h4'
            style={styles.title}>
            {i18n.t('appname')}
          </Typography>
          <Typography
            variant='subtitle1'
            style={styles.subtitle}>
            {i18n.t('signup.description')}
          </Typography>
          <div>
            <Input
              fullWidth
              disableUnderline
              style={styles.input}
              onChange={event => setFullname(event.target.value)}
              placeholder={i18n.t('fullname')} />
            <Input
              fullWidth
              disableUnderline
              style={styles.input}
              onChange={event => setEmail(event.target.value)}
              placeholder={i18n.t('email')} />
            <Input
              fullWidth
              disableUnderline
              style={styles.input}
              onChange={event => setPassword(event.target.value)}
              type='password'
              placeholder={i18n.t('password')} />
            <Button
              fullWidth
              disableElevation
              variant='contained'
              onClick={performSignUp}
              style={{
                ...styles.input,
                ...styles.button,
              }}>
              {i18n.t('send')}
            </Button>
          </div>
          <Link
            to='/auth/forgotpassword'
            style={styles.link}>
            <Typography
              variant='subtitle1'
              style={styles.subtitle}>
              {i18n.t('forgotpassword')}
            </Typography>
          </Link>
        </div>
      </div>
      <Dialogs
        open={error}
        title={i18n.t('anerrorhasocurred')}
        description={errorMessage}
        onClose={() => setError(!error)} />
    </>
  )
}

export default withRouter(Signup)