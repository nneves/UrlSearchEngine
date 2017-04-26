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
  };

  getListOfItems() {
    if (this.props.searchdata.total_rows === 0) {
      return (<div />);
    }

    return this.props.searchdata.rows.map((item) => {
        return ( <Carditem
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

  render() {
    return (
      <div className="mx4 mt2">
        <div className="mb2 border center bold rounded-top white" style={styleSearchResults}>
          Search Results
        </div>
        <div className="flex">
          <section className="container py2">
            <div className="clearfix mxn2">
              { this.getListOfItems() }
            </div>
          </section>
        </div>
      </div>
    );
  }
}

Cardlist.propTypes = {
  searchdata: React.PropTypes.object
};
