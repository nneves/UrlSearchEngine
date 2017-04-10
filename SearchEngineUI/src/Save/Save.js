import React, { Component } from 'react';

import ApiUtils from '../ApiUtils.js';

export default class SavePanel extends Component {
    constructor(props) {
      super(props);
      this.state = {value: ''};

      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
      this.setState({value: event.target.value});
    }

    handleSubmit(event) {
      console.log('A name was submitted: ' + this.state.value);
      let apiUrl = "http://localhost:8000/url";
      let payload = `url=${this.state.value}`;
      let setState = this.setState.bind(this);

      fetch(`${apiUrl}`, {  
        method: 'POST',
        headers: {
          'Accept': 'text/html',
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: payload
      })
      .then(ApiUtils.checkStatus)
      .then(function(res) {
          return res.json();
      })
      .then(function(response) {
        if (response.result !== "success") {
          throw new Error(JSON.stringify(response.message));
        }
        setState({value: ''});
        alert("Ok!");
      })
      .catch(function(err){
        console.log(err);
        alert(err);
      });

      event.preventDefault();
    }

    render() {
        return (
          <form onSubmit={this.handleSubmit}>
            <div className='px4 flex mx2 mt3 mb2'>
                <label className='mb0 mr2'>Add</label>
                <input name='url' className='mb0 input rounded-left' placeholder='http://www.awesomewebsite.com' value={this.state.value} onChange={this.handleChange} />
                <button className='btn btn-narrow btn-primary rounded-right' onClick={this.handleSubmit} > Save </button>
            </div>
          </form>
        )
    }
}
