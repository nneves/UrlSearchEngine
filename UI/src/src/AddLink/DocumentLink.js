import React, { Component } from 'react';

import Carditem from '../Cards/Carditem.js';

import Paper from 'material-ui/Paper';

const style = {
    height: "100%",
    width: "100%",
    margin: 10,
    textAlign: 'left',
    display: 'inline-block',
};

export default class DocumentLink extends Component {
    constructor(props) {
      super(props);
      this.state = {
      };
    }

    renderCarditem = () => {
        if (!this.props.data.hasOwnProperty("_id")) {
          return (<div />);
        }
        return (
            <Carditem
                removeSubmit={(docid) => {
                    this.props.removeSubmit(docid);
                    this.props.clearAddLinkDocument();
                }}
                key={this.props.data._id}
                id={this.props.data._id}
                title={this.props.data.title}
                content={this.props.data.content}
                url={this.props.data.url}
                image={this.props.data.image}
            />
        );
    };

    render() {
      return (
        <div className={this.props.visible ? 'show' : 'hide'}>
            <div className={this.props.data.hasOwnProperty("_id") ? 'show' : 'hide'}>
                <div className="px4 mx2 mt2 mb0">
                    {this.renderCarditem()}
                    <Paper style={style} zDepth={2} rounded={false}>
                        {this.props.data.content}
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
