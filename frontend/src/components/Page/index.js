import React, {useState, useEffect} from 'react'
import {
  makeStyles,
  Container,
  Typography,
  Drawer,
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemAvatar,
} from '@material-ui/core'
import {
  Home as HomeIcon,
  Group as GroupIcon,
  Timeline as TimelineIcon,
  Assignment as AssignmentIcon,
  ExitToApp as ExitToAppIcon,
  Security as SecurityIcon,
} from '@material-ui/icons'
import {
  withRouter
} from 'react-router-dom'

import {user} from '../../helpers'
import {NavBar} from '../../components'
import i18n from '../../lang'
import {Provider} from './provider'

const useStyles = makeStyles((theme) => ({
  page: {
    backgroundColor: theme.palette.background.default,
    minHeight: '100vh',
    overflow: 'hidden',
  },
  container: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
  },
  title: {
    fontWeight: 600,
    marginBottom: theme.spacing(1),
  },
}))

const Page = ({history, title = '', children = <></>}) => {
  const [open, setOpen] = useState(false)
  const classes = useStyles()
  const drawerItems = [
    {
      title: 'home',
      icon: HomeIcon,
      path: '/',
    },
    {
      title: 'keepers',
      icon: GroupIcon,
      path: '/keepers'
    },
    {
      title: 'timerecord',
      icon: TimelineIcon,
      path: '/toclockin',
    },
    {
      title: 'simplifiedbulletin',
      icon: AssignmentIcon,
      path: '/simplifiedbulletin',
    },
    {
      title: 'occurrencereport',
      icon: AssignmentIcon,
      path: '/occurrencereport',
    },
    {
      title: 'guns',
      icon: SecurityIcon,
      path: '/guns',
    },
  ]

  useEffect(() => {
    Provider.validateSession()
  }, [])

  return (
    <div className={classes.page}>
      <NavBar onOpenDrawer={() => setOpen(!open)} />
      <Container className={classes.container} fixed maxWidth='md'>
        <div>
          <Typography
            className={classes.title}
            color='primary'
            variant='h4'>
            {title}
          </Typography>
        </div>

        <div>
          {children}
        </div>
      </Container>
      <Drawer open={open} onClose={() => setOpen(false)}>
        <List>
          {drawerItems.map(({title, icon: Icon, path}) => (
            <ListItem button key={title} onClick={() => {
              history.push(path)
            }}>
              <ListItemIcon>
                <Icon />
              </ListItemIcon>
              <ListItemText primary={i18n.t(title)} />
            </ListItem>
          ))}
          <ListItem button onClick={() => {
            user.logout()
            history.replace('/')
          }}>
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText primary={i18n.t('logout')} />
          </ListItem>
        </List>
      </Drawer>
    </div>
  )
}

export default withRouter(Page)
