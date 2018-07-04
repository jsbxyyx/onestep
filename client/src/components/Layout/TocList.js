import React from 'react'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import PlayerIcon from '@material-ui/icons/PlayArrow'
import withWidth from '@material-ui/core/withWidth'
import PropTypes from 'prop-types'

class TocList extends React.Component {
  handleItemClick = path => {
    const { width } = this.props
    this.props.goto(path)
    if (width === 'xl' || width === 'lg') return
    this.props.toggleDrawer()
  }

  render() {
    const { episodes, currentCourseUid } = this.props
    const chaptList = toc => {
      return toc.map(t => (
        <ListItem
          button
          key={t.link}
          onClick={() => this.handleItemClick(`/${currentCourseUid}/${t.link}`)}
        >
          <ListItemIcon>
            <PlayerIcon />
          </ListItemIcon>
          <ListItemText>{t.title}</ListItemText>
        </ListItem>
      ))
    }

    const tocList = episodes.map(t => chaptList(t.section))
    return <List>{tocList}</List>
  }
}

TocList.propTypes = {
  toggleDrawer: PropTypes.func.isRequired,
  episodes: PropTypes.array.isRequired,
  goto: PropTypes.func.isRequired
}

export default withWidth()(TocList)
