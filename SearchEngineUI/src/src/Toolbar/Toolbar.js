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
    this.props.toggleVisibleSaveURL(!this.props.visibleSaveURL);
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
            <MenuItem primaryText="Save URL" onTouchTap={this.handleTouchTapOptions} />
          </Menu>
        </Popover>
      </div>
    )
  }
}

Toolbar.propTypes = {
  toggleVisibleSaveURL: React.PropTypes.func,
  visibleSaveURL: React.PropTypes.bool
};
