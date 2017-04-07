import React, { Component } from 'react';

import Carditem from './Carditem.js';

function getListOfItems() {
    let list = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];

    return list.map(( item, index ) => {
        return ( <Carditem key={index} data={item} /> );
    });
    
}

export default class Cardlist extends Component {
    render() {
        return (
          <div className='mx4 mt3'>
              <div className='border center bold rounded-top bg-black white'>
                  Search Results
              </div>
              <div className='flex'>
                  <section className='container py2'>
                  { getListOfItems() }
                  </section>
              </div>

          </div>
        )

    }
}
