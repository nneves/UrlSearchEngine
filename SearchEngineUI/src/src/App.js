import React, { Component } from 'react';
//import PropTypes from 'prop-types';

import ApiUtils from './ApiUtils.js';

import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import SearchPanel from './Search/Search.js';
import SavePanel from './Save/Save.js';
import Cardlist from './Cards/Cardlist.js';
import Messages from './Messages/Messages.js';
import Toolbar from './Toolbar/Toolbar.js';

//import RaisedButton from 'material-ui/RaisedButton';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

const DBPROXY_HOST = process.env.DBPROXY_HOST || 'localhost';
const DBPROXY_PORT = process.env.DBPROXY_PORT || 8000;

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      searchdata: {
        "total_rows": 0,
        "rows": []
      },
      visibleSaveURL: false
    };
    this.handleToggleVisibleSaveURL = this.handleToggleVisibleSaveURL.bind(this);
    this.handleMessage = this.handleMessage.bind(this);
    this.handleSaveSubmit = this.handleSaveSubmit.bind(this);
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
  }

  handleMessage = (msg) => {
    this.messages.showMessage(msg);
  }

  handleToggleVisibleSaveURL = (visible) => {
    this.setState({visibleSaveURL: visible});
  };

  handleSaveSubmit = (urladdress) => {
    let apiUrl = `http://${DBPROXY_HOST}:${DBPROXY_PORT}/url`;
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

  handleSearchSubmit = (serchwords) => {
    let querystring = serchwords.split(' ').join('+');
    let apiUrl = `http://${DBPROXY_HOST}:${DBPROXY_PORT}/search/${querystring}`;
    console.log(querystring);

    fetch(`${apiUrl}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      }
    })
    .then(ApiUtils.checkStatus)
    .then((response) => response.json())
    .then((response) => {
      if (response.result !== "success") {
        throw new Error(response.message);
      }
      console.log(response);
      this.handleMessage(`${serchwords} search completed!`);
      this.setState({searchdata: response.data});
    })
    .catch((err) => {
      console.log(err);
      this.handleMessage(`Failed to search ${serchwords}! Error: ${err.message}`);
    });
  };

  render() {
    return (
      <MuiThemeProvider>
      <div>
        <Toolbar
          visibleSaveURL={this.state.visibleSaveURL}
          toggleVisibleSaveURL={this.handleToggleVisibleSaveURL}
        />
        <Messages ref={(messages) => { this.messages = messages; }} />
        <SavePanel
          visibleSaveURL={this.state.visibleSaveURL}
          saveSubmit={this.handleSaveSubmit}
        />
        <SearchPanel searchSubmit={this.handleSearchSubmit} />
        <Cardlist searchdata={this.state.searchdata} />
      </div>
      </MuiThemeProvider>
    );
  }
}
