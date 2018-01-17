import React, { Component } from 'react';

import ReactMarkdown from 'react-markdown';

import * as Colors from 'material-ui/styles/colors';
import {Card, CardActions, CardHeader} from 'material-ui/Card';
import RaisedButton from 'material-ui/FlatButton';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';

const style = {
    height: "100%",
    width: "100%",
    display: "inline-block",
};

const stylePaper = {
    height: "100%",
    width: "100%",
    margin: 10,
    textAlign: "left",
    display: "inline-block",
    marginLeft: "-1px",
};

const cardtitleStyle = {
    backgroundColor: Colors.blueGrey500,
    height: 50,
};

export default class DocumentLink extends Component {

    getUrl = () => {
        if (!this.props.data.hasOwnProperty("url")) {
            return "#";
        } else {
            let url = this.props.data.url;
            if (url.toLowerCase().indexOf("http") === -1) {
                url = "http://" + url;
            }
            return (url);
        }
    };

    removeDocumentID = () => {
        this.props.removeSubmit(this.props.data._id);
        this.props.clearAddLinkDocument();
    };

    render() {
      return (
        <div className={this.props.visible ? 'show' : 'hide'}>
            <div className={this.props.data.hasOwnProperty("_id") ? 'show' : 'hide'}>
                <div className="px4 mx2 mt3 mb0">
                    <Card>
                        <CardHeader
                            title={this.props.data.title}
                            className="bold"
                            subtitle={this.props.title}
                            style={cardtitleStyle}
                        />
                        <div className="center">
                            <img src={this.props.data.image} alt="" />
                        </div>
                        <Divider />
                        <CardActions>
                          <RaisedButton
                            label="Open"
                            primary={true}
                            style={style}
                            href={this.getUrl()}
                            target="_blank"
                          />
                          <RaisedButton
                            label="Remove"
                            secondary={true}
                            style={style}
                            onTouchTap={this.removeDocumentID}
                          />
                        </CardActions>
                    </Card>
                </div>
                <div className="px4 mx2 mt2 mb0">
                    <Paper className="px2" style={stylePaper} zDepth={2} rounded={false}>
                        <ReactMarkdown source={this.props.data.content} />
                    </Paper>
                </div>
            </div>
        </div>
      )
    }
}

DocumentLink.propTypes = {
  visible: React.PropTypes.bool,
  data: React.PropTypes.object,
  removeSubmit: React.PropTypes.func,
  clearAddLinkDocument: React.PropTypes.func
};
