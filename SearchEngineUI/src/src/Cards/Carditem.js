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

  constructor(props) {
    super(props);

    this.trimContent = this.trimContent.bind(this);
    this.getImageBase64 = this.getImageBase64.bind(this);
    this.getUrl = this.getUrl.bind(this);
  }

  trimContent() {
    return (this.props.content.substring(0,100)+"...");
  }

  getImageBase64() {
    return (this.props.image);
  }

  getUrl() {
    var url = this.props.url;
    if (url.toLowerCase().indexOf("http") === -1)
      url = "http://" + url;
    return (url);
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
              href="#"
            />
          </CardActions>
        </Card>
      </div>
    );
  }
}
