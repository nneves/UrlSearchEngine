import React, { Component } from 'react';

export default class SearchPanel extends Component {

    constructor(props) {
      super(props);
      this.state = {value: ''};

      this.handleChange = this.handleChange.bind(this);
      this.handleClick = this.handleClick.bind(this);
    }

    handleChange(event) {
      this.setState({value: event.target.value});
    }

    handleClick(event) {
      this.props.searchSubmit(this.state.value);
    }

    render() {
        return (
          <div className='px4 flex m2'>
              <label className='mb0 mr2'>Search</label>
              <input className='mb0 input rounded-left' placeholder='search words' value={this.state.value} onChange={this.handleChange} />
              <button className='btn btn-narrow btn-primary rounded-right' onClick={this.handleClick} > Go </button>
          </div>
        )
    }
}
