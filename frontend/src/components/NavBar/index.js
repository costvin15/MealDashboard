import React, {useState} from 'react'
import {
  makeStyles,
  AppBar,
  Toolbar,
  IconButton,
  Popover,
  MenuItem,
} from '@material-ui/core'
import {
  Menu as MenuIcon,
  AccountCircle as AccountCircleIcon,
} from '@material-ui/icons'
import {useHistory} from 'react-router-dom'

import {user} from '../../helpers'

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
  },
  icons: {
    marginRight: theme.spacing(2),
  },
}))

const NavBar = ({onOpenDrawer = () => {}}) => {
  const [userMenu, setUserMenu] = useState(false)
  const classes = useStyles()
  const history = useHistory()

  return (
    <AppBar position='static' color={'inherit'}>
      <Toolbar disableGutters>
        <IconButton onClick={onOpenDrawer}>
          <MenuIcon />
        </IconButton>

        <div className={classes.title}>
        </div>

        <div className={classes.icons}>
          <IconButton onClick={() => setUserMenu(!userMenu)}>
            <AccountCircleIcon />
          </IconButton>

          <Popover
            open={userMenu}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            onClose={() => setUserMenu(!userMenu)}>
            <MenuItem onClick={() => {
              user.logout()
              history.replace('/auth/login')
            }}>Sair</MenuItem>
          </Popover>
        </div>
      </Toolbar>
    </AppBar>
  )
}

export default NavBar
