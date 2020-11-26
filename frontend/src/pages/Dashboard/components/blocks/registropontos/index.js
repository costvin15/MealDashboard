import React, {useState} from 'react'
import {
  makeStyles,
  Card,
  CardHeader,
  CardActions,
  Typography,
  Button,
} from '@material-ui/core'
import {
  withRouter,
} from 'react-router-dom'

import {Dialogs} from '../../../../../components'
import i18n from '../../../../../lang'

const useStyles = makeStyles((theme) => ({
  cardContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    borderRadius: 5,
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.text.secondary,
  }
}))

const RegistroDePontos = ({history, onError}) => {
  const classes = useStyles()
  const [error, setError] = useState(false)

  return (
    <>
      <Card>
        <CardHeader title={<Typography>{i18n.t('timerecord')}</Typography>} />
        {/* <CardContent>
        </CardContent> */}
        <CardActions>
          <Button
            className={classes.button}
            disableElevation
            variant='contained'
            onClick={() => {
              history.push('/toclockin')
            }}>
            {i18n.t('viewmore')}
          </Button>
        </CardActions>
      </Card>
      <Dialogs
        open={error}
        title={i18n.t('anerrorhasocurred')}
        description={i18n.t('checkyourinternet')}
        onClose={() => setError(false)} />
    </>
  )
}

export default withRouter(RegistroDePontos)
