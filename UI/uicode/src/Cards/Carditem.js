import React, { Component } from 'react';
import { PropTypes } from 'prop-types';

const cardStyle = {
  width: "400px",
  height: "500px"
};

const trimTextStyle = {
  textOverflow: "ellipsis",
  overflow: "hidden",
};

export default class Carditem extends Component {

  trimContent = () => {
    return (this.props.content.substring(0,145)+"...");
  }

  trimURL = () => {
    return this.props.url.substring(0,50);
  }

  getImageBase64 = () => {
    return (this.props.image);
  }

  getUrl = () => {
    var url = this.props.url;
    if (url.toLowerCase().indexOf("http") === -1)
      url = "http://" + url;
    return (url);
  }

  openURL = () => {
    window.open(this.getUrl());
  }

  removeURL = (event) => {
    this.props.removeSubmit(this.props.id);
  }

  render() {
    return (
      <div className="mb3 px2 sm-col sm-col-3">
        <div className="ui cards">
          <div className="card" style={cardStyle}>
            <div className="image">
              <img src={this.getImageBase64()} className="block" role="presentation" />
            </div>
            <div className="content">
              <div className="header">
                {this.props.title}
              </div>
              <div className="meta">
                {this.trimURL()}
              </div>
              <div className="description" style={trimTextStyle}>
                {this.trimContent()}
              </div>
            </div>
            <div className="extra content">
              <div className="ui two buttons">
                <div className="ui basic green button" onClick={this.openURL}>Open</div>
                <div className="ui basic red button" onClick={this.removeURL}>Remove</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
Carditem.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  content: PropTypes.string,
  url: PropTypes.string,
  image: PropTypes.string,
  removeSubmit: PropTypes.func
};
