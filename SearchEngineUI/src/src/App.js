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
import UploadBookmark from './Bookmarks/UploadBookmark.js';

import CircularProgress from 'material-ui/CircularProgress';

//import RaisedButton from 'material-ui/RaisedButton';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

const DBPROXY_HOST = process.env.DBPROXY_HOST || 'localhost';
const DBPROXY_PORT = process.env.DBPROXY_PORT || 8000;

const styleCircularProgress = {
  height: 24,
};

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      searchdata: {
        "total_rows": 0,
        "rows": []
      },
      visibleSaveURL: false,
      idleStatus: true
    };
  }

  handleMessage = (msg) => {
    this.messages.showMessage(msg);
  }

  handleToggleVisibleSaveURL = (visible) => {
    this.setState({visibleSaveURL: visible});
  };

  handleToggleVisibleBookmarksUpload = (visible) => {
    this.setState({visibleBookmarksUpload: visible});
  };

  handleSaveSubmit = (urladdress) => {
    let apiUrl = `http://${DBPROXY_HOST}:${DBPROXY_PORT}/url`;
    let payload = `url=${urladdress}`;
    //let setState = this.setState.bind(this);

    this.setState({idleStatus: false});

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
      this.handleMessage(`Success: ${urladdress}`);
      this.setState({idleStatus: true});
    })
    .catch((err) => {
      console.log(err);
      this.handleMessage(`Error: ${err.message}`);
      this.setState({idleStatus: true});
    });
  };

  handleRemoveSubmit = (docid) => {
    let apiUrl = `http://${DBPROXY_HOST}:${DBPROXY_PORT}/remove/${encodeURIComponent(docid)}`;

    this.setState({idleStatus: false});

    fetch(`${apiUrl}`, {
      method: 'DELETE',
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
      this.handleMessage(`Success: ${docid}`);
      this.setState({idleStatus: true});
    })
    .catch((err) => {
      console.log(err);
      this.handleMessage(`Error: ${err.message}`);
      this.setState({idleStatus: true});
    });
  };

  handleSearchSubmit = (serchwords) => {
    let querystring = serchwords.split(' ').join('+');
    let apiUrl = `http://${DBPROXY_HOST}:${DBPROXY_PORT}/search/${querystring}`;
    this.setState({idleStatus: false});

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
      this.handleMessage(`Success: ${serchwords}`);
      this.setState({searchdata: response.data});
      this.setState({idleStatus: true});
    })
    .catch((err) => {
      console.log(err);
      this.handleMessage(`Error: ${err.message}`);
      this.setState({idleStatus: true});
    });
  };

  render() {
    return (
      <MuiThemeProvider>
      <div>
        <Toolbar
          visibleSaveURL={this.state.visibleSaveURL}
          toggleVisibleSaveURL={this.handleToggleVisibleSaveURL}
          visibleBookmarksUpload={this.state.visibleBookmarksUpload}
          toggleVisibleBookmarksUpload={this.handleToggleVisibleBookmarksUpload}
        />

        <Messages
          ref={(messages) => { this.messages = messages; }}
        />

        <SavePanel
          visibleSaveURL={this.state.visibleSaveURL}
          saveSubmit={this.handleSaveSubmit}
        />

        <UploadBookmark
          visibleBookmarksUpload={this.state.visibleBookmarksUpload}
        />

        <SearchPanel
          searchSubmit={this.handleSearchSubmit}
        />

        <div className="mt2 mb0 center" style={styleCircularProgress}>
          <CircularProgress
            className={this.state.idleStatus ? "hide" : "show"}
            size={24}
            thickness={2}
          />
        </div>

        <Cardlist
          searchdata={this.state.searchdata}
          removeSubmit={this.handleRemoveSubmit}
        />
      </div>
      </MuiThemeProvider>
    );
  }
}
