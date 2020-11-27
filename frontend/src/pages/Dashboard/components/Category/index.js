import React, {useState, useEffect} from 'react'
import {
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  makeStyles,
} from '@material-ui/core'
import {
  useHistory,
} from 'react-router-dom'

import {Provider} from './provider'

const useStyles = makeStyles((theme) => ({
  list: {
    width: '100%',
  },
  ul: {
    padding: 0,
  },
  loadingContainer: {
    width: '100%',
    display: 'flex',
    alignContent: 'center',
    justifyContent: 'center',
  },
}))

const Category = ({id}) => {
  const classes = useStyles()
  const history = useHistory()
  const [loading, setLoading] = useState(false)
  const [category, setCategory] = useState([])

  useEffect(() => {
    (async () => {
      try {
        setLoading(true)
        const data = await Provider.getCategory(id)
        setCategory(data)
        console.log(data)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    })()
  }, [id])

  return (
    <>
      {(!loading && (
        <List className={classes.list} component='nav'>
          {category.map((meal, index) => (
            <ListItem button onClick={() => history.push(`/meals/${meal.idMeal}`)}>
              <ListItemText key={index}>{meal.strMeal}</ListItemText>
            </ListItem>
          ))}
        </List>
      )) || (
        <div className={classes.loadingContainer}>
          <CircularProgress variant='indeterminate' />
        </div>
      )}
    </>
  )
}

export default Category
