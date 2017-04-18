import React, { Component } from 'react';

import Carditem from './Carditem.js';

export default class Cardlist extends Component {

  constructor(props) {
    super(props);

    this.getListOfItems = this.getListOfItems.bind(this);
  }

  getListOfItems() {
    if (this.props.searchdata.total_rows === 0) {
      return (<div></div>);
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
  }

  render() {
      return (
        <div className='mx4 mt3'>
            <div className='border center bold rounded-top bg-black white'>
                Search Results
            </div>
            <div className="hide"><pre>{JSON.stringify(this.props.searchdata, null, 2) }</pre></div>
            <div className='flex'>
                <section className='container py2'>
                { this.getListOfItems() }
                </section>
            </div>

        </div>
      )

  }
}
