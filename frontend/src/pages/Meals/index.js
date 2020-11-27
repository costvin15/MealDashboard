import React, {useState, useEffect} from 'react'
import {
  Grid,
  Card,
  CardMedia,
  CardHeader,
  CardContent,
  CardActions,
  Typography,
  IconButton,
  CircularProgress,
  makeStyles,
} from '@material-ui/core'
import {
  YouTube as YoutubeIcon,
  Link as LinkIcon,
} from '@material-ui/icons'
import {useParams} from 'react-router-dom'

import {Provider} from './provider'
import {Page} from '../../components'

const useClasses = makeStyles((theme) => ({
  leftSection: {
    float: 'left',
    width: '100%',
    paddingRight: theme.spacing(1),
    paddingBottom: theme.spacing(2),
  },
  rightSection: {
    float: 'right',
    paddingBottom: theme.spacing(2),
  },
  cardMedia: {
    height: 0,
    paddingTop: '56.25%',
  },
  loadingContainer: {
    width: '100%',
    display: 'flex',
    alignContent: 'center',
    justifyContent: 'center',
  },
}))

const Meals = () => {
  const params = useParams()
  const classes = useClasses()
  const [details, setDetails] = useState({})
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    (async () => {
      try {
        setLoading(true)
        const data = await Provider.getDetails(params.id)
        setDetails(data)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    })()
  }, [params])

  return (
    <Page title='Receita'>
      {(!loading && (
        <Grid>
          <Grid className={classes.leftSection} item xs={4}>
            <Card>
              <CardHeader
                title={details?.strMeal}
                subheader={details?.strArea} />
              <CardMedia
                className={classes.cardMedia}
                image={details?.strMealThumb} />
              <CardContent>
                {details?.ingredients?.map(({ingredient, measure}, index) => (
                  <Typography key={index}>{ingredient} ({measure})</Typography>
                ))}
              </CardContent>
              <CardActions>
                <IconButton href={details?.strMealThumb}>
                  <YoutubeIcon />
                </IconButton>

                <IconButton href={details?.strSource}>
                  <LinkIcon />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
          <Grid className={classes.rightSection} item xs={8}>
            <Typography>{details?.strInstructions}</Typography>
          </Grid>
        </Grid>
      )) || (
        <div className={classes.loadingContainer}>
          <CircularProgress />
        </div>
      )}
    </Page>
  )
}

export default Meals
