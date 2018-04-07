import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
 
export default class Toolbar extends Component {
  state = {};

  render() {
    return (
      <div className="px2 pt1 pb2">
        <div className="ui menu">
          <NavLink className="item" activeClassName="active" to="/search">Search</NavLink>
          <NavLink className="item" activeClassName="active" to="/addlink">Add Link</NavLink>
          <NavLink className="item" activeClassName="active" to="/uploadbookmark">Upload Bookmark</NavLink>
          <NavLink className="item" activeClassName="active" to="/managebookmark">Manage Bookmark</NavLink>
        </div>
      </div>
    )
  }
}