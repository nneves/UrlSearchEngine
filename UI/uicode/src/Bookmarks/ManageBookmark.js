import React, { Component } from 'react';
import { PropTypes } from 'prop-types';

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
      )
    }
}

ManageBookmark.propTypes = {
    loadManageBookmark: PropTypes.func
};
