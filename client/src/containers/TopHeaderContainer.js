import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import TopHeader from '../components/Header/TopHeader'

class TopHeaderContainer extends Component {
  logout = () => {
    this.props.dispatch({ type: 'LOG_OUT'})
    window.localStorage.removeItem('userInfo')
  }

  render () {
    let tempIsAuthenticated = window.localStorage.getItem('userInfo')

    const LoginLink = (
      <div>
        <Link className='headerButton' to='signup'>注册</Link>
        <Link className='headerButton' to='/login'>登录</Link>
        <Link className='headerButton' to='/wechatLogin'>微信登录</Link>
      </div>
    )

    const LogoutLink = (
      <div>
        {/* <span className='headerButton'>{this.props.currentUserInfo.currentUser.username}</span> */}
        <span className='headerButton'>{tempIsAuthenticated}</span>
        <Link className='headerButton' to='/' onClick={this.logout}>退出</Link>
      </div>
    )

    return (
      <TopHeader
        // sideButtons={this.props.currentUserInfo.isAuthenticated ? LogoutLink : LoginLink}
        sideButtons={tempIsAuthenticated ? LogoutLink : LoginLink}
      />
    )
  }
}

const mapStateToProps = (state) => ({
  currentUserInfo: state.fakeAuth
})

export default connect(mapStateToProps)(TopHeaderContainer)
