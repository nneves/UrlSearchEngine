import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import ApiUtils from './ApiUtils.js';
import { COUCHDB_SEARCHENGINE, COUCHDB_BOOKMARKENGINE } from './envvars.js';
import PouchDB from 'pouchdb-browser';

import Search from './Search/Search.js';
import AddLink from './AddLink/AddLink.js';
import DocumentLink from './AddLink/DocumentLink.js';
import Cardlist from './Cards/Cardlist.js';
import Message from './Messages/Message.js';
import Spinner from './Messages/Spinner.js';
import Toolbar from './Toolbar/Toolbar.js';
import UploadBookmark from './Bookmarks/UploadBookmark.js';
import ManageBookmark from './Bookmarks/ManageBookmark.js';

const dbSearchEngine = new PouchDB(`${window.location.origin}/couchdb/${COUCHDB_SEARCHENGINE}/`);
const dbBookmarkEngine = new PouchDB(`${window.location.origin}/couchdb/${COUCHDB_BOOKMARKENGINE}/`);

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
      idleStatus: true,
      addLinkDocument: {}
    };
  }

  showMessage = (msg) => {
    this.message.showMessage(msg);
  }

  saveSubmit = (urladdress) => {
    const apiUrl = `/url`;
    const payload = `url=${urladdress}`;

    this.setState({idleStatus: false});
    this.setState({addLinkDocument: {}});

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
    }).then(data => {
      // TODO: move "dbSearchEngine.get()" to be called from the api
      dbSearchEngine.get(data.id).then((doc) => {
        this.setState({addLinkDocument: doc});
        this.setState({idleStatus: true});
      }).catch((err) => {
          console.log(err);
          this.setState({idleStatus: true});
      });
    }).catch((err) => {
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
      // remove docid from state
      let currState = this.state.searchData.rows;
      let currCount = this.state.searchData.total_rows;
      const index = currState.map((data) => { return data.id; }).indexOf(docid);
      if (index > -1 ) {
          currState.splice(index, 1);
          this.setState({searchData: {
            "total_rows": currCount - 1,
            "rows": currState
          }});
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
    this.setState({searchData: {"total_rows": 0, "rows": []}});

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
    this.setState({idleStatus: false});
    // TODO: move "dbBookmarkEngine.allDocs()" to be called from the api
    dbBookmarkEngine.allDocs({include_docs: true, descending: true}, (err, doc) => {
      if (doc.hasOwnProperty("total_rows") === false) {
        throw new Error(doc);
      }
      this.setState({manageBookmarkData: doc});
      this.setState({idleStatus: true});
    }).catch((err) => {
      console.log(err);
      this.showMessage(`Error: ${err.message}`);
      this.setState({idleStatus: true});
    });
  };

  render() {
    return (
      <Router>
        <div id="app">
          <Toolbar />

          <Switch>
            <Redirect exact={true} from="/" to="search" />

            <Route exact={true} path="/addlink" render={() => (
              <div>
                <AddLink
                  submit={this.saveSubmit}
                />
                <DocumentLink
                  data={this.state.addLinkDocument}
                  removeSubmit={this.removeSubmit}
                  clearAddLinkDocument={this.clearAddLinkDocument}
                />
              </div>
            )}/>

            <Route exact={true} path="/uploadbookmark" render={() => (
              <UploadBookmark
                loadManageBookmark={this.loadManageBookmark}
              />
            )}/>
            <Route exact={true} path="/managebookmark" render={() => (
              <ManageBookmark
                loadManageBookmark={this.loadManageBookmark}
                manageBookmarkData={this.state.manageBookmarkData}
              />
            )}/>

            <Route exact={true} path="/search" render={() => (
              <div>
                <Search
                  submit={this.searchSubmit}
                />
                <Cardlist
                  searchData={this.state.searchData}
                  removeSubmit={this.removeSubmit}
                />
              </div>
            )}/>
          </Switch>

          <Spinner
            visible={!this.state.idleStatus}
          />

          <Message
            ref={(message) => { this.message = message; }}
          />
        </div>
      </Router>
    );
  }
}
