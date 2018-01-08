import React, { Component } from 'react';

export default class ManageBookmark extends Component {
    constructor(props) {
      super(props);
      this.state = {
      };

    }

    componentDidMount(){
        this.props.loadManageBookmark();
      }

    render() {
      return (
        <div className={this.props.visible ? 'show' : 'hide'}>
            <div className="px4 mx2 mt2 mb0">
                {this.props.manageBookmarkData.rows.map((data) => {
                    console.log(data);
                    return (<div key={data.key}>ID={data.id}</div>);
                })}
            </div>
        </div>
      )
    }
}

ManageBookmark.propTypes = {
    visible: React.PropTypes.bool,
    loadManageBookmark: React.PropTypes.func
};
