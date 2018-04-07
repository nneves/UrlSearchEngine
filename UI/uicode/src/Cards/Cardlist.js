import React, { Component } from 'react';
import { PropTypes } from 'prop-types';

import { Grid } from 'semantic-ui-react';

import Carditem from './Carditem.js';

const styleSearchResults = {
  backgroundColor: "gray",
};

export default class Cardlist extends Component {

  getListOfItems = () => {
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

  getCountOfItems = () => {
    if (this.props.searchData.total_rows > 0) {
      let counter = `[${this.props.searchData.total_rows}]`;
      return counter;
    }
    return "";
  };

  render() {
    return (
      <div className={this.props.visible ? 'show' : 'hide'}>
        <div className="mx2 mt2 mb2 border center bold rounded white" style={styleSearchResults}>
          Search Results {this.getCountOfItems()}
        </div>
        <Grid divided='vertically'>
            <Grid.Row columns={1}>
                <Grid.Column>
                    <div className="center">
                        { this.getListOfItems() }
                    </div>
                </Grid.Column>
            </Grid.Row>
        </Grid>
      </div>
    );
  }
}

Cardlist.propTypes = {
  visible: PropTypes.bool,
  searchData: PropTypes.object,
  removeSubmit: PropTypes.func
};
