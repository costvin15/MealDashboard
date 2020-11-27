import React, {useState, useEffect} from 'react'
import {
  makeStyles,
  CircularProgress,
} from '@material-ui/core'

import i18n from '../../lang'
import {Provider} from './provider'
import {Page} from '../../components'
import {
  Category,
  Categories,
} from './components'

const useStyles = makeStyles((theme) => ({
  loadingContainer: {
    width: '100%',
    display: 'flex',
    alignContent: 'center',
    justifyContent: 'center',
  },
}))

const Dashboard = () => {
  const classes = useStyles()
  const [loading, setLoading] = useState(false)
  const [categories, setCategories] = useState([])

  useEffect(() => {
    (async () => {
      try {
        setLoading(true)
        const {categories : data} = await Provider.getCategories()
        setCategories(data)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  return (
    <Page title={`${i18n.t('hello')}`}>
      {(!loading && (
        <Categories categories={categories} renderItem={({id}) => <Category id={id} />} />
      )) || (
        <div className={classes.loadingContainer}>
          <CircularProgress />
        </div>
      )}
    </Page>
  )
}

export default Dashboard
