import React, {useState, useEffect} from 'react'
import {
  makeStyles,
} from '@material-ui/core'

import i18n from '../../lang'
import {Provider} from './provider'
import {Page} from '../../components'
import {
  Category,
  Categories,
} from './components'

const useStyles = makeStyles((theme) => ({
}))

const Dashboard = () => {
  const classes = useStyles()
  const [categories, setCategories] = useState([])

  useEffect(() => {
    (async () => {
      try {
        const {categories : data} = await Provider.getCategories()
        setCategories(data)
      } catch (error) {
        console.error(error)
      }
    })()
  }, [])

  return (
    <Page title={`${i18n.t('hello')}`}>
      <Categories categories={categories} renderItem={({id}) => <Category id={id} />} />
    </Page>
  )
}

export default Dashboard
