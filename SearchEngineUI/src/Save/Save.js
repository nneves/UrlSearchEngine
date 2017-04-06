import React, { Component } from 'react';
import './Save.css';


export default class SavePanel extends Component {
    render() {
        return (
          <div className='px4 flex mx2 mt3 mb2'>
              <label className='mb0 mr2'>Add</label>
              <input name='url' className='mb0 input rounded-left' placeholder='http://www.awesomewebsite.com' />
              <button className='btn btn-narrow btn-primary rounded-right' > Save </button>
          </div>
        )
    }
}
