import React, { Component } from 'react';

import AppBar from 'material-ui/AppBar';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';

const styles = {
  title: {
    cursor: 'pointer',
  },
};

export default class Toolbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false
    };
  };

  handleTouchTapOptions = (event) => {
    this.setState({
      open: false,
      anchorEl: event.currentTarget
    });
    if(event.currentTarget.id === "addLink") {
      this.props.toggleVisibleAddLink(!this.props.visibleAddLink);
      this.props.toggleVisibleBookmarksUpload(false);
    } else if(event.currentTarget.id === "bookmarksUpload") {
      this.props.toggleVisibleAddLink(false);
      this.props.toggleVisibleBookmarksUpload(!this.props.visibleBookmarksUpload);
    }
  };

  handleTouchTapMenuitem = (event) => {
    // This prevents ghost click.
    event.preventDefault();

    this.setState({
      open: true,
      anchorEl: event.currentTarget,
    });
  };

  handleRequestCloseMenuitem = () => {
    this.setState({
      open: false,
    });
  };

  render() {
    return (
      <div>
        <AppBar
          title={<span style={styles.title}>URL Search Engine</span>}
          onLeftIconButtonTouchTap={this.handleTouchTapMenuitem}
        />
        <Popover
          open={this.state.open}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
          targetOrigin={{horizontal: 'left', vertical: 'top'}}
          onRequestClose={this.handleRequestCloseMenuitem}
        >
          <Menu>
            <MenuItem id="addLink" primaryText="Add Link" onTouchTap={this.handleTouchTapOptions} />
            <MenuItem id="bookmarksUpload" primaryText="Bookmarks Upload" onTouchTap={this.handleTouchTapOptions} />
          </Menu>
        </Popover>
      </div>
    )
  }
}

Toolbar.propTypes = {
  toggleVisibleAddLink: React.PropTypes.func,
  toggleVisibleBookmarksUpload: React.PropTypes.func,
  visibleAddLink: React.PropTypes.bool,
  visibleBookmarksUpload: React.PropTypes.bool,
};
