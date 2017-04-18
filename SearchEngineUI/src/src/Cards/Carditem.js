import React, { Component } from 'react';
import Divider from 'material-ui/Divider';

export default class Carditem extends Component {

  constructor(props) {
    super(props);

    this.trimContent = this.trimContent.bind(this);
    this.getImageBase64 = this.getImageBase64.bind(this);
    this.getUrl = this.getUrl.bind(this);
  }

  trimContent() {
    return (this.props.content.substring(0,100)+"...");
  }

  getImageBase64() {
    return (this.props.image);
  }

  getUrl() {
    var url = this.props.url;
    if (url.toLowerCase().indexOf("http") === -1)
      url = "http://" + url;
    return (url);
  }

  render() {
    return (
      <div name={this.props.id} className='col col-6 sm-col-4 md-col-3 lg-col-2 mb2 px1'>
        <div className='border bg-white rounded border-black'>
          <a href={this.getUrl()} target='_blank' className='block'>
            <img src={this.getImageBase64()} className='block' role='presentation' />
          </a>
          <div className="mt1"></div>
          <Divider/>
          <div className='p2'>
            <h1 className='h4 mt0'>{this.props.title}</h1>
          </div>
        </div>
      </div>
    )
  }
}

//              <p className='mb0'>{this.trimContent()}</p>
