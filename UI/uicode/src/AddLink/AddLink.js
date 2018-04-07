import React, { Component } from 'react';
import { PropTypes } from 'prop-types';

const styleButton = {
  width: 200,
};

export default class AddLink extends Component {
    constructor(props) {
      super(props);
      this.state = {
        value: '',
      };
    }

    handleChange = (event) => {
      this.setState({value: event.target.value});
    }

    handleClick = (event) => {
      this.props.submit(this.state.value);
    }

    render() {
      return (
        <div>
          <form onSubmit={event => {event.preventDefault(); this.handleClick();} }>
            <div className="px2 mt2 mb0">
              <div className="ui pointing below label">
                Add URL
              </div>
              <div className="ui left icon input transparent">
                <input
                  type="text"
                  placeholder="https://github.com/nneves/UrlSearchEngine"
                  onChange={this.handleChange}
                />
                <i className="linkify icon pl3"/>
              </div>
            </div>
            <div className="px2 mt2 mb0">
              <button className="ui button active" style={styleButton}>Save</button>
            </div>
          </form>
        </div>
      )
    }
}

AddLink.propTypes = {
  submit: PropTypes.func,
};