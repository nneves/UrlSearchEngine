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

const COUCHDB_HOST = process.env.COUCHDB_HOST || 'localhost';
const COUCHDB_PORT = process.env.COUCHDB_PORT || 5984;
const COUCHDB_DBNAME = process.env.COUCHDB_DBNAME || "searchengine";
const SAVEURL_HOST = process.env.SAVEURL_HOST || 'localhost';
const SAVEURL_PORT = process.env.SAVEURL_PORT || 8000;

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      searchdata: {
        "total_rows": 0,
        "rows": []
      }
    };
    this.handleMessage = this.handleMessage.bind(this);
    this.handleSaveSubmit = this.handleSaveSubmit.bind(this);
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
  }

  handleMessage = (msg) => {
    this.messages.showMessage(msg);
  }

  handleSaveSubmit = (urladdress) => {
    let apiUrl = `http://${SAVEURL_HOST}:${SAVEURL_PORT}/url`;
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
    //curl -X GET --silent http://localhost:5984/_fti/local/searchengine/_design/search/by_content?q=brilliant&include_docs=true | jq .
    let querystring = serchwords.split(' ').join('+');
    let apiUrl = `http://${COUCHDB_HOST}:${COUCHDB_PORT}/_fti/local/${COUCHDB_DBNAME}/_design/search/by_content?q=${querystring}&include_docs=true`;
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
      if (response.hasOwnProperty("etag") === false) {
        throw new Error(response.message);
      }
      console.log(response);
      this.handleMessage(`${serchwords} search completed!`);
      this.setState({searchdata: response});
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
        <Messages ref={(messages) => { this.messages = messages; }} />
        <SavePanel saveSubmit={this.handleSaveSubmit.bind(this)} />
        <SearchPanel searchSubmit={this.handleSearchSubmit.bind(this)} />
        <Cardlist searchdata={this.state.searchdata} />
      </div>
      </MuiThemeProvider>
    );
  }
}
