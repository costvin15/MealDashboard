import React from 'react'
import {withRouter} from 'react-router-dom'
import {
  makeStyles,
  Card,
  CardHeader,
  Typography,
  CardActions,
  Button,
} from '@material-ui/core'

import i18n from '../../../../../lang'

const useStyles = makeStyles((theme) => ({
  button: {
    borderRadius: 5,
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.text.secondary,
  }
}))

const BoletimSimplificado = ({history}) => {
  const classes = useStyles()

  return (
    <>
      <Card>
        <CardHeader title={
          <Typography>{i18n.t('simplifiedbulletin')}</Typography>
        } />
        <CardActions>
          <Button
            className={classes.button}
            disableElevation
            variant='contained'
            onClick={() => {
              history.push('/simplifiedbulletin')
            }}>
            {i18n.t('viewmore')}
          </Button>
        </CardActions>
      </Card>
    </>
  )
}

export default withRouter(BoletimSimplificado)
