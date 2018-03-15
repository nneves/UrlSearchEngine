import React, { Component } from 'react';

export default class Message extends Component {
  constructor(props) {
    super(props);
    this.state = {
      autoHideDuration: 10000,
      message: 'Initial message ...',
      open: false,
    };
  }

  showMessage = (message) => {
    this.setState({
      message: message,
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

    /*
        <Snackbar
        open={this.state.open}
        message={this.state.message}
        action="Close"
        autoHideDuration={this.state.autoHideDuration}
        onActionTouchTap={this.handleActionTouchTap}
        onRequestClose={this.handleRequestClose}
      />
  */

  render() {
    return (
      <div className={this.state.open ? "show" : "hide"}>
        <div className="mt2 mb0 px2">
          <div className="ui success message">
            <i className="close icon" onClick={this.handleRequestClose}></i>
            <div className="header">
              {this.state.title}
            </div>
            <p>{this.state.message}</p>
          </div>
        </div>
      </div>
    );
  }
}
