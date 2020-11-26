import React, {useState, useEffect} from 'react'
import {
  makeStyles,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Typography,
  Button,
} from '@material-ui/core'
import {
  Group as GroupIcon
} from '@material-ui/icons'
import {
  withRouter,
} from 'react-router-dom'

import Provider from './provider'
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

const Guardas = ({history, onError}) => {
  const classes = useStyles()
  const [length, setLength] = useState(0)
  const [error, setError] = useState(false)

  useEffect(() => {
    (async () => {
      try {
        const response = await Provider.getLength()
        setLength(response)
      } catch (error) {
        console.log(error)
        setError(true)
        onError()
      }
    })()
  }, [onError])

  return (
    <>
      <Card>
        <CardHeader title={<Typography>{i18n.t('keepers')}</Typography>} />
        <CardContent>
          <div className={classes.cardContent}>
            <GroupIcon fontSize="large" />
            <Typography>{length}</Typography>
          </div>
        </CardContent>
        <CardActions>
          <Button
            className={classes.button}
            disableElevation
            variant='contained'
            onClick={() => {
              history.push('/keepers')
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

export default withRouter(Guardas)
