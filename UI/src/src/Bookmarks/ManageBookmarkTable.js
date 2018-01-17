import React, { Component } from 'react';

import { COUCHDB_BOOKMARKENGINE } from './../envvars.js';

import RaisedButton from 'material-ui/RaisedButton';
import {Toolbar, ToolbarGroup, ToolbarTitle} from 'material-ui/Toolbar';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
  } from 'material-ui/Table';

import Paper from 'material-ui/Paper';

const stylePaper = {
    height: "100%",
    width: "100%",
    margin: 0,
    textAlign: "left",
    display: "inline-block",
    marginLeft: "-1px",
};

const styleBtn = {
    height: "100%",
    width: "100%",
    display: "inline-block",
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
            <div key={'renderTbl-'+key} className="px4 mx2 mt2 mb0">
                <RaisedButton label={"Load Bookmark: "+key} style={styleBtn} onClick={this.loadManageBookmarkTable} />
            </div>
        )
    }

    renderTableRown = (key, idx, elem) => {
        return (
            <TableRow key={'tbl-row-'+idx+'-'+key}>
                <TableRowColumn key={'tbl-row-col1-'+idx+'-'+key}>{elem}</TableRowColumn>
            </TableRow>
        );
    }

    renderTableWithData = (key, data) => {
        let tableRown = data.map((elem, idx) => {
            return this.renderTableRown(key, idx, elem);
        });

        return (
            <div key={'renderTbl-'+key} className="px4 mx2 mt2 mb0">
                <Paper key={'paper-'+key} style={stylePaper} zDepth={2} rounded={false}>
                    <Toolbar>
                        <ToolbarGroup>
                        <ToolbarTitle text={key} />
                        </ToolbarGroup>
                    </Toolbar>                
                    <Table key={'tbl-'+key} selectable={false} >
                        <TableHeader key={'tbl-hdr-'+key} displaySelectAll={false} adjustForCheckbox={false}>
                            <TableRow key={'tbl-hdr-row-'+key}>
                                <TableHeaderColumn key={'tbl-hdr-row-col-'+key}>URL</TableHeaderColumn>
                            </TableRow>
                        </TableHeader>
                        <TableBody key={'tbl-body-'+key} displayRowCheckbox={false}>
                            { tableRown }
                        </TableBody>
                    </Table>
                </Paper>
            </div>
        )
    }

    render() {
      return (
        <div key={'manageBookmarkTableInner-'+this.props.tableKey} className="px4 mx2 mt3 mb0">
            { this.renderTable() }
        </div>
      )
    }
}

ManageBookmarkTable.propTypes = {
    tableKey: React.PropTypes.string
};
