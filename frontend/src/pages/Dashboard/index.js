import React, {useState} from 'react'
import {
  makeStyles,
} from '@material-ui/core'

import i18n from '../../lang'
import {user} from '../../helpers'
import {Page} from '../../components'
import {
  ArmasBlock,
  GuardasBlock,
  // ViaturasBlock,
  EquipamentosBlock,
  RegistroDePontosBlock,
  BoletimSimplificadoBlock,
  BoletimDeOcorrenciaBlock,
} from './components'

const useStyles = makeStyles((theme) => ({
  card: {
    width: '100%',
    marginBottom: theme.spacing(3),
  },
  errorWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorContainer: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    maxWidth: 400,
    width: '100%',
  },
}))

const Dashboard = () => {
  const classes = useStyles()
  const [error, setError] = useState(false)

  return (
    <Page title={`${i18n.t('hello')} ${user.getInfo().nome}`}>
      {(error && (
        <div className={classes.errorWrapper}>
          <div className={classes.errorContainer}>
            <p>Hello, World!</p>
          </div>
        </div>
      )) || (
        <div className='row'>
          <div className='col-12 col-md-3'>
            <div className={classes.card}>
              <GuardasBlock onError={() => {
                setError(true)
              }} />
            </div>
          </div>
          <div className='col-12 col-md-3'>
            <div className={classes.card}>
              <RegistroDePontosBlock onError={() => {
                setError(true)
              }} />
            </div>
          </div>
          <div className='col-12 col-md-3'>
            <div className={classes.card}>
              <BoletimSimplificadoBlock onError={() => {
                setError(true)
              }} />
            </div>
          </div>
          <div className='col-12 col-md-3'>
            <div className={classes.card}>
              <BoletimDeOcorrenciaBlock onError={() => {
                setError(true)
              }} />
            </div>
          </div>
          <div className='col-12 col-md-3'>
            <div className={classes.card}>
              <ArmasBlock onError={() => {
                setError(true)
              }} />
            </div>
          </div>
          {/* <div className='col-12 col-md-3'>
            <div className={classes.card}>
              <ViaturasBlock onError={() => {
                setError(true)
              }} />
            </div>
          </div> */}
          <div className='col-12 col-md-3'>
            <div className={classes.card}>
              <EquipamentosBlock onError={() => {
                setError(true)
              }} />
            </div>
          </div>
        </div>
      )}
    </Page>
  )
}

export default Dashboard
