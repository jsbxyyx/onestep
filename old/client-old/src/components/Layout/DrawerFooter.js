import React from 'react'
import UserIcon from '@material-ui/icons/AccountCircle'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Toolbar from '@material-ui/core/Toolbar'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { Typography, IconButton } from '@material-ui/core'

const styles = theme => ({
  btnWrap: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between'
  },
  userWrap: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between'
  },
  userIconLoggedIn: {
    color: theme.palette.primary.main
  },
  menuItem: {
    width: 200
  }
})

class DrawerFooter extends React.Component {
  state = {
    anchorEl: null
  }

  handlePopoverOpen = e => {
    this.setState({ anchorEl: e.target })
  }

  handleClick = path => {
    this.props.goto(path)
    this.setState({ anchorEl: null })
    this.props.toggleDrawer()
  }

  handleClose = () => {
    this.setState({ anchorEl: null })
  }

  logout = () => {
    this.props.logout()
    this.setState({ anchorEl: null })
  }
  render() {
    const { currentUser, isAuthenticated, classes: s } = this.props

    const { anchorEl } = this.state
    const loggedInItem = (
      <React.Fragment>
        <MenuItem
          className={s.menuItem}
          onClick={() => this.handleClick('/user/profile')}
        >
          个人中心
        </MenuItem>
        <MenuItem className={s.menuItem} onClick={() => this.handleClick('/')}>
          首页
        </MenuItem>
        <MenuItem className={s.menuItem} onClick={this.logout}>
          退出
        </MenuItem>
      </React.Fragment>
    )

    const loggedOutItem = (
      <React.Fragment>
        <MenuItem
          className={s.menuItem}
          onClick={() => this.handleClick('/login')}
        >
          登录
        </MenuItem>
        <MenuItem
          className={s.menuItem}
          onClick={() => this.handleClick('/signup')}
        >
          注册
        </MenuItem>
        <MenuItem className={s.menuItem} onClick={() => this.handleClick('/')}>
          首页
        </MenuItem>
      </React.Fragment>
    )

    return (
      <Toolbar className={s.userWrap}>
        <IconButton onClick={this.handlePopoverOpen}>
          <UserIcon
            className={classNames({ [s.userIconLoggedIn]: isAuthenticated })}
          />
        </IconButton>
        <Typography variant="title">
          {isAuthenticated ? ` Hello, ${currentUser.username}` : 'Good Day!'}
        </Typography>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
          className={s.menu}
        >
          {isAuthenticated ? loggedInItem : loggedOutItem}
        </Menu>
      </Toolbar>
    )
  }
}

DrawerFooter.propTypes = {
  goto: PropTypes.func.isRequired,
  toggleDrawer: PropTypes.func.isRequired
}

export default withStyles(styles)(DrawerFooter)
