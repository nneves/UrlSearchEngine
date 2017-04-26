import React from 'react';
import Snackbar from 'material-ui/Snackbar';

export default class SnackbarExampleSimple extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      autoHideDuration: 30000,
      message: 'Initial message ...',
      open: false,
    };

    this.showMessage = this.showMessage.bind(this);
  }

  showMessage = (msg) => {
    this.setState({
      message: msg.substring(0,50),
      open: true,
    });
  };

  openMessage = (msg, time) => {
    this.setState({
      autoHideDuration: time,
      message: msg,
      open: true,
    });
  };

  handleTouchTap = () => {
    this.setState({
      open: true,
    });
  };

  handleActionTouchTap = () => {
    this.setState({
      open: false,
    });
  };

  handleChangeDuration = (event) => {
    const value = event.target.value;
    this.setState({
      // eslint-disable-next-line
      autoHideDuration: value.length > 0 ? parseInt(value) : 0,
    });
  };

  handleRequestClose = () => {
    this.setState({
      open: false,
    });
  };

  render() {
    return (
      <Snackbar
        open={this.state.open}
        message={this.state.message}
        action="Close"
        autoHideDuration={this.state.autoHideDuration}
        onActionTouchTap={this.handleActionTouchTap}
        onRequestClose={this.handleRequestClose}
      />
    );
  }
}
