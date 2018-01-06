import React, { Component } from 'react';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

const style = {
  width: 200,
};

export default class AddLink extends Component {
    constructor(props) {
      super(props);
      this.state = {
        value: '',
      };

      //this.handleChange = this.handleChange.bind(this);
      //this.handleClick = this.handleClick.bind(this);
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
            <div className="px4 flex mx2 mt1 mb0">
              <TextField
                value={this.state.value}
                hintText="https://github.com/nneves/UrlSearchEngine"
                floatingLabelText="Add Link"
                fullWidth={true}
                onChange={this.handleChange}
              />
            </div>
            <div className="px4 flex mx2 mt0 mb0">
              <RaisedButton label="Save" primary={true} style={style} onClick={this.handleClick} />
            </div>
          </form>
        </div>
      )
    }
}

AddLink.propTypes = {
  visible: React.PropTypes.bool,
  submit: React.PropTypes.func,
};
