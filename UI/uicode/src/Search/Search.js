import React, { Component } from 'react';

const styleButton = {
  width: 200,
};

export default class SearchPanel extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: ''
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
      <div className={this.props.visible ? 'show' : 'hide'}>
        <form onSubmit={event => {event.preventDefault(); this.handleClick();} }>
          <div className="px2 mt2 mb0">
            <div className="ui pointing below label">
              Search
            </div>
            <div className="ui left icon input transparent">
              <input
                type="text"
                value={this.state.value}
                onChange={this.handleChange}
              />
              <i className="search icon pl3"/>
            </div>
          </div>
          <div className="px2 mt2 mb0">
            <button className="ui button active" style={styleButton}>Search</button>
          </div>
        </form>
      </div>
    )
  }
}

SearchPanel.propTypes = {
  visible: React.PropTypes.bool,
  submit: React.PropTypes.func
};
