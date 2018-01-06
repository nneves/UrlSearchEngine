import React, { Component } from 'react';
//import PropTypes from 'prop-types';

import ApiUtils from './ApiUtils.js';

import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Search from './Search/Search.js';
import AddLink from './AddLink/AddLink.js';
import DocumentLink from './AddLink/DocumentLink.js';
import Cardlist from './Cards/Cardlist.js';
import Messages from './Messages/Messages.js';
import Toolbar from './Toolbar/Toolbar.js';
import UploadBookmark from './Bookmarks/UploadBookmark.js';

import CircularProgress from 'material-ui/CircularProgress';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

// https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#adding-custom-environment-variables
const COUCHDB_DATABASE = process.env.REACT_APP_COUCHDB_DATABASE || "searchengine";

const styleCircularProgress = {
  height: 24
};

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      searchdata: {
        "total_rows": 0,
        "rows": []
      },
      visibleAddLink: false,
      visibleBookmarksUpload: false,
      visibleSearch: true,
      idleStatus: true,
      addLinkDocument: {}
    };
  }

  showMessage = (msg) => {
    this.messages.showMessage(msg);
  }

  toggleVisibleSearch = (visible) => {
    this.setState({visibleSearch: visible});
  };

  toggleVisibleAddLink = (visible) => {
    this.setState({visibleAddLink: visible});
  };

  toggleVisibleBookmarksUpload = (visible) => {
    this.setState({visibleBookmarksUpload: visible});
  };

  saveSubmit = (urladdress) => {
    const apiUrl = `/url`;
    const payload = `url=${urladdress}`;

    this.setState({idleStatus: false, addLinkDocument: {}});

    fetch(`${apiUrl}`, {
      method: 'POST',
      headers: {
        'Accept': 'text/html',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: payload
    })
    .then(ApiUtils.checkStatus)
    .then(response => response.json())
    .then(response => {
      if (response.result !== "success") {
        throw new Error(response.message);
      }
      this.showMessage(`Success: ${urladdress}`);
      return response.data;
    })
    .then(data => {
      const couchUrl = `/couchdb/${COUCHDB_DATABASE}`;
      const documentID = encodeURIComponent(data.id);
      const requestURL = `${couchUrl}/${documentID}`;
      fetch(`${requestURL}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json'
        }
      })
      .then(ApiUtils.checkStatus)
      .then(response => response.json())
      .then(response => {
        this.setState({idleStatus: true, addLinkDocument: response});
      })

    })
    .catch((err) => {
      console.log(err);
      this.showMessage(`Error: ${err.message}`);
      this.setState({idleStatus: true});
    });
  };

  removeSubmit = (docid) => {
    const apiUrl = `/remove/${encodeURIComponent(docid)}`;

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
      this.showMessage(`Success: ${docid}`);
      this.setState({idleStatus: true});
    })
    .catch((err) => {
      console.log(err);
      this.showMessage(`Error: ${err.message}`);
      this.setState({idleStatus: true});
    });
  };

  searchSubmit = (serchwords) => {
    const querystring = serchwords.split(' ').join('+');
    const apiUrl = `/search/${querystring}`;
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
      this.showMessage(`Success: ${serchwords}`);
      this.setState({searchdata: response.data});
      this.setState({idleStatus: true});
    })
    .catch((err) => {
      console.log(err);
      this.showMessage(`Error: ${err.message}`);
      this.setState({idleStatus: true});
    });
  };

  clearAddLinkDocument = () => {
    this.setState({addLinkDocument: {}});
  };

  render() {
    return (
      <MuiThemeProvider>
      <div>
        <Toolbar
          visibleSearch={this.state.visibleSearch}
          visibleAddLink={this.state.visibleAddLink}
          visibleBookmarksUpload={this.state.visibleBookmarksUpload}
          toggleVisibleAddLink={this.toggleVisibleAddLink}
          toggleVisibleBookmarksUpload={this.toggleVisibleBookmarksUpload}
          toggleVisibleSearch={this.toggleVisibleSearch}
        />

        <Messages
          ref={(messages) => { this.messages = messages; }}
        />

        <AddLink
          visible={this.state.visibleAddLink}
          submit={this.saveSubmit}
        />
        <DocumentLink
          visible={this.state.visibleAddLink}
          data={this.state.addLinkDocument}
          removeSubmit={this.removeSubmit}
          clearAddLinkDocument={this.clearAddLinkDocument}
        />

        <UploadBookmark
          visible={this.state.visibleBookmarksUpload}
        />

        <Search
          visible={this.state.visibleSearch}
          submit={this.searchSubmit}
        />

        <div className="mt2 mb0 center" style={styleCircularProgress}>
          <CircularProgress
            className={this.state.idleStatus ? "hide" : "show"}
            color="#E91E63"
            size={35}
            thickness={3.5}
          />
        </div>

        <Cardlist
          visible={this.state.visibleSearch}
          searchdata={this.state.searchdata}
          removeSubmit={this.removeSubmit}
        />
      </div>
      </MuiThemeProvider>
    );
  }
}
