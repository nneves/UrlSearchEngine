import React, { Component } from 'react';

import * as Colors from 'material-ui/styles/colors';
import Carditem from './Carditem.js';

const styleSearchResults = {
  backgroundColor: Colors.cyan500,
};

export default class Cardlist extends Component {

  constructor(props) {
    super(props);

    this.getListOfItems = this.getListOfItems.bind(this);
    this.getCountOfItems = this.getCountOfItems.bind(this);
  };

  getListOfItems() {
    if (this.props.searchData.total_rows === 0) {
      return (<div />);
    }
    return this.props.searchData.rows.map((item) => {
        return (
          <Carditem
            removeSubmit={this.props.removeSubmit}
            key={item.doc._id}
            id={item.doc._id}
            title={item.doc.title}
            content={item.doc.content}
            url={item.doc.url}
            image={item.doc.image}
          />
        );
    });
  };

  getCountOfItems() {
    if (this.props.searchData.total_rows > 0) {
      let counter = `[${this.props.searchData.total_rows}]`;
      return counter;
    }
    return "";
  };

  render() {
    return (
      <div className={this.props.visible ? 'show' : 'hide'}>
        <div className="mx4 mt2">
          <div className="mb2 border center bold rounded-top white" style={styleSearchResults}>
            Search Results {this.getCountOfItems()}
          </div>
          <div className="flex">
            <section className="container py2">
              <div className="clearfix mxn2">
                { this.getListOfItems() }
              </div>
            </section>
          </div>
        </div>
      </div>
    );
  }
}

Cardlist.propTypes = {
  visible: React.PropTypes.bool,
  searchData: React.PropTypes.object,
  removeSubmit: React.PropTypes.func
};
