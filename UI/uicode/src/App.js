import React, { Component } from 'react';
//import PropTypes from 'prop-types';

import ApiUtils from './ApiUtils.js';
import { COUCHDB_SEARCHENGINE, COUCHDB_BOOKMARKENGINE } from './envvars.js';

import injectTapEventPlugin from 'react-tap-event-plugin';

import Search from './Search/Search.js';
import AddLink from './AddLink/AddLink.js';
import DocumentLink from './AddLink/DocumentLink.js';
import Cardlist from './Cards/Cardlist.js';
import Message from './Messages/Message.js';
import Spinner from './Messages/Spinner.js';
import Toolbar from './Toolbar/Toolbar.js';
import UploadBookmark from './Bookmarks/UploadBookmark.js';
import ManageBookmark from './Bookmarks/ManageBookmark.js';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchData: {
        "total_rows": 0,
        "rows": []
      },
      manageBookmarkData: {
        total_rows: 0,
        offset: 0,
        rows: []
      },
      manageBookmarkTableData: [],
      visibleAddLink: false,
      visibleUploadBookmark: false,
      visibleManageBookmark: false,
      visibleSearch: true,
      idleStatus: true,
      addLinkDocument: {}
    };
  }

  showMessage = (msg) => {
    this.message.showMessage(msg);
  }

  toggleVisibleSearch = (visible) => {
    this.setState({visibleSearch: visible});
  };

  toggleVisibleAddLink = (visible) => {
    this.setState({visibleAddLink: visible});
  };

  toggleVisibleUploadBookmark = (visible) => {
    this.setState({visibleUploadBookmark: visible});
  };

  toggleVisibleManageBookmark = (visible) => {
    this.setState({visibleManageBookmark: visible});
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
      const couchUrl = `/couchdb/${COUCHDB_SEARCHENGINE}`;
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
      this.setState({searchData: response.data});
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

  loadManageBookmark = () => {
    const couchUrl = `/couchdb/${COUCHDB_BOOKMARKENGINE}/_all_docs`;
    this.setState({idleStatus: false});

    fetch(`${couchUrl}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      }
    })
    .then((response) => response.json())
    .then((response) => {
      if (response.hasOwnProperty("total_rows") === false) {
        throw new Error(response);
      }
      //this.showMessage(`Success: Found ${response.total_rows} Bookmarks`);
      this.setState({manageBookmarkData: response});
      this.setState({idleStatus: true});
    })
    .catch((err) => {
      console.log(err);
      this.showMessage(`Error: ${err.message}`);
      this.setState({idleStatus: true});
    });
  };

  render() {
    return (
      <div id="app">
        <Toolbar
          visibleSearch={this.state.visibleSearch}
          visibleAddLink={this.state.visibleAddLink}
          visibleUploadBookmark={this.state.visibleUploadBookmark}
          toggleVisibleAddLink={this.toggleVisibleAddLink}
          toggleVisibleUploadBookmark={this.toggleVisibleUploadBookmark}
          toggleVisibleManageBookmark={this.toggleVisibleManageBookmark}
          toggleVisibleSearch={this.toggleVisibleSearch}
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
          visible={this.state.visibleUploadBookmark}
          loadManageBookmark={this.loadManageBookmark}
        />
        <ManageBookmark
          visible={this.state.visibleManageBookmark}
          loadManageBookmark={this.loadManageBookmark}
          manageBookmarkData={this.state.manageBookmarkData}
        />

        <Search
          visible={this.state.visibleSearch}
          submit={this.searchSubmit}
        />

        <Spinner
          visible={!this.state.idleStatus}
        />

        <Cardlist
          visible={this.state.visibleSearch}
          searchData={this.state.searchData}
          removeSubmit={this.removeSubmit}
        />

        <Message
          ref={(message) => { this.message = message; }}
        />
      </div>
    );
  }
}
