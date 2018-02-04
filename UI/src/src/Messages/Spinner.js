import React, { Component } from 'react';

export default class Spinner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'Please wait ...',
      message: 'Your request is being processed',
      visible: false,
    };
  }

  show = (title, message) => {
    this.setState({
      title: title ? title : this.state.title,
      message: message ? message : this.state.message,
      visible: true,
    });
  };

  hide = () => {
    this.setState({
      visible: false,
    });
  };

  render() {
    return (
      <div className={this.state.visible || this.props.visible ? "show" : "hide"}>
        <div className="mt2 mb0 px2">
          <div className="ui icon message">
            <i className="notched circle loading icon"></i>
            <div className="content">
              <div className="header">
                {this.state.title}
              </div>
              <p>{this.state.message}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Spinner.propTypes = {
  visible: React.PropTypes.bool
};