import React, { Component } from 'react';
//import PropTypes from 'prop-types';

import ApiUtils from './ApiUtils.js';

import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

//import Avatar from 'material-ui/Avatar';
//import Chip from 'material-ui/Chip';

//import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
//import FlatButton from 'material-ui/FlatButton';

import SearchPanel from './Search/Search.js';
import SavePanel from './Save/Save.js';
import Cardlist from './Cards/Cardlist.js';
import Messages from './Messages/Messages.js';

//import RaisedButton from 'material-ui/RaisedButton';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();


export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {};
    this.handleMessage = this.handleMessage.bind(this);
    this.handleSaveSubmit = this.handleSaveSubmit.bind(this);
  }

  handleMessage = (msg) => {
    this.messages.showMessage(msg);
  }

  handleSaveSubmit = (urladdress) => {
    let apiUrl = "http://localhost:8000/url";
    let payload = `url=${urladdress}`;
    //let setState = this.setState.bind(this);

    fetch(`${apiUrl}`, {
      method: 'POST',
      headers: {
        'Accept': 'text/html',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: payload
    })
    .then(ApiUtils.checkStatus)
    .then((response) => response.json())
    .then((response) => {
      if (response.result !== "success") {
        throw new Error(response.message);
      }
      this.handleMessage(`${urladdress} saved with success!`);
    })
    .catch((err) => {
      console.log(err);
      this.handleMessage(`Failed to save ${urladdress}! Error: ${err.message}`);
    });
  };

  render() {
    return (
      <MuiThemeProvider>
      <div>
        <Messages ref={(messages) => { this.messages = messages; }} />
        <SavePanel saveSubmit={this.handleSaveSubmit.bind(this)} />
        <SearchPanel />
        <Cardlist />
      </div>
      </MuiThemeProvider>
    );
  }
}
