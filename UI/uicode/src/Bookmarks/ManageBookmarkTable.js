import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import _ from 'lodash';

import { COUCHDB_BOOKMARKENGINE } from './../envvars.js';
import PouchDB from 'pouchdb-browser';

const dbBookmarkEngine = new PouchDB(`${window.location.origin}/couchdb/${COUCHDB_BOOKMARKENGINE}/`);

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
            data: []
        };
    }

    loadManageBookmarkTable = () => {
        const { tableKey } = this.props;
        this.setState({idleStatus: false});
        // TODO: move "dbBookmarkEngine.get()" to be called from the api
        dbBookmarkEngine.get(tableKey).then((doc) => {
            this.setState({data: doc.bookmarkList});
            this.setState({idleStatus: true});
        }).catch((err) => {
            console.log(err);
            this.setState({idleStatus: true});
        });
    };

    deleteManageBookmarkTable = () => {
       const { tableKey } = this.props;
       this.setState({idleStatus: false});
       // TODO: move "dbBookmarkEngine.get()" to be called from the api
       dbBookmarkEngine.get(tableKey).then((doc) => {
           return dbBookmarkEngine.remove(doc);
        }).then((response) => {
            if(response.ok) {
                this.props.reloadData();
            }
            this.setState({idleStatus: true});
        }).catch((err) => {
            console.log(err);
            this.setState({idleStatus: true});  
        });
    };

    deleteBookmark = (e) => {
        let currState = this.state.data;
        const index = currState.map((data) => { return data.hash; }).indexOf(e.target.id);
        if (index > -1 ) {
            currState[index].deleted = !currState[index].deleted;
            this.setState({data: currState});
        }
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
            <tr key={'tbl-row-'+idx+'-'+key} className={ elem.deleted ? "red" : ""}>
                <td key={'tbl-row-col1-'+idx+'-'+key} className="center aligned">
                    <div className="ui buttons">
                    <button
                        key={'deleteBookmark-'+idx+'-'+key}
                        id={elem.hash}
                        className="ui icon button"
                        style={optionRemoveButtonStyle}
                        onClick={this.deleteBookmark}>
                            <i id={elem.hash} className={ elem.deleted ? "blue plus icon" : "red close icon"} ref={(node) => {
                                if (node) {
                                    node.style.setProperty("margin-left", "-4px", "important");
                                    node.style.setProperty("margin-top", "-2px", "important");
                                }
                            }} />
                    </button>
                    <button
                        key={'editBookmark-'+idx+'-'+key}
                        id={elem.hash}
                        className="ui icon button"
                        style={optionEditButtonStyle}
                        onClick={this.editBookmark}>
                            <i id={elem.hash} className="blue pencil alternate icon" ref={(node) => {
                                if (node) {
                                    node.style.setProperty("margin-left", "-4px", "important");
                                    node.style.setProperty("margin-top", "-2px", "important");
                                }
                            }} />
                    </button>
                    </div>
                </td>
                <td key={'tbl-row-col2-'+idx+'-'+key}>{elem.url}</td>
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
    tableKey: PropTypes.string,
    reloadData: PropTypes.func,
    deleteBookmark: PropTypes.func,
    editBookmark: PropTypes.func
};
