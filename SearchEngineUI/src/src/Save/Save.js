import React, { Component } from 'react';

export default class SavePanel extends Component {
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
      this.props.saveSubmit(this.state.value);
    }

    render() {
        return (
          <div>
            <div className="px4 flex mx2 mt3 mb2">
                <label className="mb0 mr2">Add</label>
                <input name="url" className="mb0 input rounded-left" placeholder="http://www.awesomewebsite.com" value={this.state.value} onChange={this.handleChange} />
                <button className="btn btn-narrow btn-primary rounded-right" onClick={this.handleClick} > Save </button>
            </div>
          </div>
        )
    }
}

SavePanel.propTypes = {
  saveSubmit: React.PropTypes.func,
};
