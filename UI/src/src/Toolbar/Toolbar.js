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
    if(event.currentTarget.id === "search") {
      this.props.toggleVisibleSearch(true);
      this.props.toggleVisibleAddLink(false);
      this.props.toggleVisibleUploadBookmark(false);
      this.props.toggleVisibleManageBookmark(false);
    } else if(event.currentTarget.id === "addLink") {
      this.props.toggleVisibleSearch(false);
      this.props.toggleVisibleAddLink(true);
      this.props.toggleVisibleManageBookmark(false);
      this.props.toggleVisibleUploadBookmark(false);
    } else if(event.currentTarget.id === "uploadBookmark") {
      this.props.toggleVisibleSearch(false);
      this.props.toggleVisibleAddLink(false);
      this.props.toggleVisibleUploadBookmark(true);
      this.props.toggleVisibleManageBookmark(false);
    } else if(event.currentTarget.id === "manageBookmark") {
      this.props.toggleVisibleSearch(false);
      this.props.toggleVisibleAddLink(false);
      this.props.toggleVisibleUploadBookmark(false);
      this.props.toggleVisibleManageBookmark(true);
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
            <MenuItem id="search" primaryText="Search" onTouchTap={this.handleTouchTapOptions} />
            <MenuItem id="uploadBookmark" primaryText="Upload Bookmarks" onTouchTap={this.handleTouchTapOptions} />
            <MenuItem id="manageBookmark" primaryText="Manage Bookmarks" onTouchTap={this.handleTouchTapOptions} />
          </Menu>
        </Popover>
      </div>
    )
  }
}

Toolbar.propTypes = {
  visibleAddLink: React.PropTypes.bool,
  visibleUploadBookmark: React.PropTypes.bool,
  visibleManageBookmark: React.PropTypes.bool,
  visibleSearch: React.PropTypes.bool,
  toggleVisibleAddLink: React.PropTypes.func,
  toggleVisibleUploadBookmark: React.PropTypes.func,
  toggleVisibleManageBookmark: React.PropTypes.func,
  toggleVisibleSearch: React.PropTypes.func,
};
