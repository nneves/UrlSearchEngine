import React, { Component } from 'react';

import ReactMarkdown from 'react-markdown';

const cardTitleStyle = {
    backgroundColor: "grey"
};

const cardStyle = {
    width: "100%"
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
                <div className="mx2 mt2 mb0">
                    <div className="ui card" style={cardStyle}>
                        <div className="content" style={cardTitleStyle}>
                            <div className="description">
                                {this.props.data.title}
                            </div>
                        </div>
                        <div className="extra content">
                            <a href={this.getUrl()} target="_blank">
                                <button className="ui primary button">
                                    Open
                                </button>
                            </a>
                            <button className="ui negative button" onClick={this.removeDocumentID}>
                                Remove
                            </button>
                        </div>
                        <div className="image">
                            <img src={this.props.data.image} alt="" />
                        </div>
                        <div className="ui divider"></div>
                        <div className="mx2">
                            <ReactMarkdown source={this.props.data.content} />
                        </div>
                    </div>
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
