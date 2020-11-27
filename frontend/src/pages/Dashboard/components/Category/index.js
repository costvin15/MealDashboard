import React, {useState, useEffect} from 'react'
import {
  List,
  ListItem,
  ListItemText,
  makeStyles,
} from '@material-ui/core'

import {Provider} from './provider'

const useStyles = makeStyles((theme) => ({
  list: {
    width: '100%',
  },
  ul: {
    padding: 0,
  },
}))

const Category = ({id}) => {
  const classes = useStyles()
  const [category, setCategory] = useState([])

  useEffect(() => {
    (async () => {
      try {
        const data = await Provider.getCategory(id)
        setCategory(data)
      } catch (error) {
        console.log(error)
      }
    })()
  }, [])

  return (
    <List className={classes.list} component="nav">
      {category.map((meal, index) => (
        <ListItem button>
          <ListItemText key={index}>{meal.strMeal}</ListItemText>
        </ListItem>
      ))}
    </List>
  )
}

export default Category
