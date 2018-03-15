import React, { Component } from 'react';

import ManageBookmarkTable from './ManageBookmarkTable';

export default class ManageBookmark extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount(){
        this.props.loadManageBookmark();
    }

    reloadManageBookmark = () => {
        this.props.loadManageBookmark();
    };

    render() {
      return (
        <div className={this.props.visible ? 'show' : 'hide'}>
            <div className="mx2 mt2 mb0">
                {this.props.manageBookmarkData.rows.map((data) => {
                    return (
                        <ManageBookmarkTable
                            key={'manageBookmarkTable-'+data.key}
                            tableKey={data.key}
                            reloadData={this.reloadManageBookmark}
                        />
                    );
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
