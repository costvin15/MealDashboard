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
  },
  rightSection: {
    float: 'right',
  },
  cardMedia: {
    height: 0,
    paddingTop: '56.25%',
  },
}))

const Meals = () => {
  const params = useParams()
  const classes = useClasses()
  const [details, setDetails] = useState({})

  useEffect(() => {
    (async () => {
      try {
        const data = await Provider.getDetails(params.id)
        setDetails(data)
      } catch (error) {
        console.error(error)
      }
    })()
  }, [])

  return (
    <Page title='Receita'>
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
              <Typography>Beef (1kg)</Typography>
              <Typography>Beef (1kg)</Typography>
              <Typography>Beef (1kg)</Typography>
              <Typography>Beef (1kg)</Typography>
              <Typography>Beef (1kg)</Typography>
            </CardContent>
            <CardActions>
              <IconButton>
                <YoutubeIcon />
              </IconButton>

              <IconButton>
                <LinkIcon />
              </IconButton>
            </CardActions>
          </Card>
        </Grid>
        <Grid className={classes.rightSection} item xs={8}>
          <Typography>Preheat the oven to 150C\/300F\/Gas 2.\r\nToss the beef and flour together in a bowl with some salt and black pepper.\r\nHeat a large casserole until hot, add half of the rapeseed oil and enough of the beef to just cover the bottom of the casserole.\r\nFry until browned on each side, then remove and set aside. Repeat with the remaining oil and beef.\r\nReturn the beef to the pan, add the wine and cook until the volume of liquid has reduced by half, then add the stock, onion, carrots, thyme and mustard, and season well with salt and pepper.\r\nCover with a lid and place in the oven for two hours.\r\nRemove from the oven, check the seasoning and set aside to cool. Remove the thyme.\r\nWhen the beef is cool and you're ready to assemble the pie, preheat the oven to 200C\/400F\/Gas 6.\r\nTransfer the beef to a pie dish, brush the rim with the beaten egg yolks and lay the pastry over the top. Brush the top of the pastry with more beaten egg.\r\nTrim the pastry so there is just enough excess to crimp the edges, then place in the oven and bake for 30 minutes, or until the pastry is golden-brown and cooked through.\r\nFor the green beans, bring a saucepan of salted water to the boil, add the beans and cook for 4-5 minutes, or until just tender.\r\nDrain and toss with the butter, then season with black pepper.\r\nTo serve, place a large spoonful of pie onto each plate with some green beans alongside.</Typography>
        </Grid>
      </Grid>
    </Page>
  )
}

export default Meals
