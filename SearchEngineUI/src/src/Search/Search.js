import React, { Component } from 'react';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

const style = {
  width: 200,
};

export default class SearchPanel extends Component {

    constructor(props) {
      super(props);
      this.state = {
        value: ''
      };

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
          <div>
            <form onSubmit={event => {event.preventDefault(); this.handleClick();} }>
              <div className="px4 flex mx2 mt1 mb0">
                <TextField
                  value={this.state.value}
                  hintText="search words"
                  floatingLabelText="Search"
                  fullWidth={true}
                  onChange={this.handleChange}
                />
              </div>
              <div className="px4 flex mx2 mt0 mb0">
                <RaisedButton label="Search" primary={false} style={style} onClick={this.handleClick} />
              </div>
            </form>
          </div>
        )
    }
}

SearchPanel.propTypes = {
  searchSubmit: React.PropTypes.func
};
