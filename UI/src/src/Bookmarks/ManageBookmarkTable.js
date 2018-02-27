import React, { Component } from 'react';

import { COUCHDB_BOOKMARKENGINE } from './../envvars.js';

const tableStyle = {
    height:"500px",
    width:"100%",
    overflowX:"scroll"
};

const optionEditButtonStyle = {
    height:"30px",
    width:"30px"
};

const optionRemoveButtonStyle = {
    height:"30px",
    width:"30px"
};

export default class ManageBookmarkTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            removed: []
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
            this.setState({data: response.bookmarkList});
            this.setState({idleStatus: true});
        })
        .catch((err) => {
            console.log(err);
            this.setState({idleStatus: true});
        });
    };

    deleteManageBookmarkTable = () => {
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
        .then((response) => response._rev)
        .then((rev) => {
            const couchDeleteUrl = `/couchdb/${COUCHDB_BOOKMARKENGINE}/${docKey}?rev=${rev}`;
            fetch(`${couchDeleteUrl}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                }
            })
            .then((response) => response.json())
            .then((response) => {
                if(response.ok) {
                    this.props.reloadData();
                }
                this.setState({idleStatus: true});
            })
            .catch((err) => {
                console.log(err);
                this.setState({idleStatus: true});
            });
        })
        .catch((err) => {
          console.log(err);
          this.setState({idleStatus: true});
        });
    };

    removeBookmark = (e) => {
        let currState = this.state.removed;
        const index = currState.indexOf(e.target.id);
        if (index === -1) {
            currState.push(e.target.id);
        } else {
            currState.splice(index, 1);
        }
        this.setState({removed: currState});
        console.log("remove Bookmark: ", e.target.id);
    };

    editBookmark = (e) => {
        console.log("edit Bookmark: ", e.target.id);
    };

    renderTable  = () => {
        const key = this.props.tableKey;
        const data = this.state.data;
        return data.length > 0 ? this.renderTableWithData(key, data) : this.renderTableEmpty(key)
    }

    renderTableEmpty = (key) => {
        return (
            <div key={'renderTbl-'+key}>
                <button className="ui basic blue button" onClick={this.loadManageBookmarkTable}>
                    {"Load Bookmark: "+key}
                </button>
                <button className="ui basic red button" onClick={this.deleteManageBookmarkTable}>
                    {"Delete Bookmark: "+key}
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
                <td key={'tbl-row-col1-'+idx+'-'+key} className="center aligned">
                    <div className="ui buttons">
                    <button
                        key={'removeBookmark-'+idx+'-'+key}
                        id={idx+'_'+key}
                        className="ui icon button"
                        style={optionRemoveButtonStyle}
                        onClick={this.removeBookmark}>
                            <i id={idx+'_'+key} className="red close icon" ref={(node) => {
                                if (node) {
                                    node.style.setProperty("margin-left", "-4px", "important");
                                    node.style.setProperty("margin-top", "-2px", "important");
                                }
                            }} />
                    </button>
                    <button
                        key={'editBookmark-'+idx+'-'+key}
                        id={idx+'_'+key}
                        className="ui icon button"
                        style={optionEditButtonStyle}
                        onClick={this.editBookmark}>
                            <i id={idx+'_'+key} className="blue pencil alternate icon" ref={(node) => {
                                if (node) {
                                    node.style.setProperty("margin-left", "-4px", "important");
                                    node.style.setProperty("margin-top", "-2px", "important");
                                }
                            }} />
                    </button>
                    </div>
                </td>
                <td key={'tbl-row-col2-'+idx+'-'+key}>{elem}</td>
            </tr>
        );
    }

    renderTableWithData = (key, data) => {
        let tableRown = data.map((elem, idx) => {
            return this.renderTableRown(key, idx, elem);
        });

        return (
            <div key={'renderTbl-'+key} style={tableStyle}>
                <table className="ui striped padded compact table blue">
                    <thead>
                        <tr>
                            <th colSpan="2">
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
    tableKey: React.PropTypes.string,
    reloadData: React.PropTypes.func,
    removeBookmark: React.PropTypes.func,
    editBookmark: React.PropTypes.func
};
