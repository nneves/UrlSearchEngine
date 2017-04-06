import React, { Component } from 'react';
import './Search.css';


export default class SearchPanel extends Component {
    render() {
        return (
          <div className='px4 flex m2'>
              <label className='mb0 mr2'>Search</label>
              <input className='mb0 input rounded-left' placeholder='search words' />
              <button className='btn btn-narrow btn-primary rounded-right' > Go </button>
          </div>
        )
    }
}
