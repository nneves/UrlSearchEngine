import React, { Component } from 'react';

import { COUCHDB_BOOKMARKENGINE } from './../envvars.js';

const tableStyle = {
    height:"500px",
    width:"100%",
    overflowX:"scroll"
};

export default class ManageBookmarkTable extends Component {
    constructor(props) {
      super(props);
      this.state = {
          data: []
      };
    }

    loadManageBookmarkTable = () => {
        const docKey = this.props.tableKey
        const couchUrl = `/couchdb/${COUCHDB_BOOKMARKENGINE}/${docKey}`;
        this.setState({idleStatus: false});
    
        fetch(`${couchUrl}`, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
          }
        })
        .then((response) => response.json())
        .then((response) => {
          /*
          if (response.hasOwnProperty("total_rows") === false) {
            throw new Error(response);
          }
          */
          //console.log(response.bookmarkList);
          this.setState({data: response.bookmarkList});
          this.setState({idleStatus: true});
        })
        .catch((err) => {
          console.log(err);
          this.setState({idleStatus: true});
        });
    };

    renderTable  = () => {
        const key = this.props.tableKey;
        const data = this.state.data;
        return data.length > 0 ? this.renderTableWithData(key, data) : this.renderTableEmpty(key)
    }

    renderTableEmpty = (key) => {
        return (
            <div key={'renderTbl-'+key}>
                <button className="ui basic button" onClick={this.loadManageBookmarkTable}>
                    {"Load Bookmark: "+key}
                </button>
            </div>
        )
    }

    closeBookmark = () => {
        this.setState({data: []});
    }

    renderTableRown = (key, idx, elem) => {
        return (
            <tr key={'tbl-row-'+idx+'-'+key}>
                <td key={'tbl-row-col1-'+idx+'-'+key}>{elem}</td>
            </tr>
        );
    }

    renderTableWithData = (key, data) => {
        let tableRown = data.map((elem, idx) => {
            return this.renderTableRown(key, idx, elem);
        });

        return (
            <div key={'renderTbl-'+key} style={tableStyle}>
                <table className="ui striped padded compact table violet">
                    <thead>
                        <tr>
                            <th>
                                <button id={key} className="ui button" onClick={this.closeBookmark}>
                                    Close
                                </button>
                                <span className="mx2">{key}</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        { tableRown }
                    </tbody>
                </table>
            </div>
        )
    }

    render() {
      return (
        <div key={'manageBookmarkTableInner-'+this.props.tableKey} className="mt3 mb0">
            { this.renderTable() }
        </div>
      )
    }
}

ManageBookmarkTable.propTypes = {
    tableKey: React.PropTypes.string
};
