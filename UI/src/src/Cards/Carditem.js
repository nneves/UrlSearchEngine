import React, { Component } from 'react';

import * as Colors from 'material-ui/styles/colors';
import Divider from 'material-ui/Divider';
import {Card, CardActions, CardMedia, CardTitle} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';

const style = {
  margin: 12,
};

const pixelV = {
  height: 1,
};

const cardtitleStyle = {
  backgroundColor: Colors.blueGrey500,
  height: 75,
};

export default class Carditem extends Component {

  trimContent = () => {
    return (this.props.content.substring(0,100)+"...");
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

  handleTouchTap = (event) => {
    this.props.removeSubmit(this.props.id);
  }

  render() {
    return (
      <div className="mb3 px2 sm-col sm-col-3">
        <Card>
          <CardTitle className="bold" subtitle={this.props.title} style={cardtitleStyle} />
          <div className="mt0">
            <Divider />
          </div>
          <CardMedia>
            <a href={this.getUrl()} target="_blank" className="block">
              <img src={this.getImageBase64()} className="block" role="presentation" />
            </a>
          </CardMedia>
          <div style={pixelV} />
          <Divider />
          <CardActions>
            <RaisedButton
              label="Open"
              primary={true}
              style={style}
              href={this.getUrl()}
              target="_blank"
            />
            <RaisedButton
              label="Remove"
              secondary={true}
              style={style}
              onTouchTap={this.handleTouchTap}
            />
          </CardActions>
        </Card>
      </div>
    );
  }
}

Carditem.propTypes = {
  id: React.PropTypes.string,
  title: React.PropTypes.string,
  content: React.PropTypes.string,
  url: React.PropTypes.string,
  image: React.PropTypes.string,
  removeSubmit: React.PropTypes.func
};
