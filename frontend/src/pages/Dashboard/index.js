import React, {useState} from 'react'
import {
  makeStyles,
} from '@material-ui/core'

import i18n from '../../lang'
import {Page} from '../../components'

const useStyles = makeStyles((theme) => ({
}))

const Dashboard = () => {
  const classes = useStyles()

  return (
    <Page title={`${i18n.t('hello')}`}>
    </Page>
  )
}

export default Dashboard
