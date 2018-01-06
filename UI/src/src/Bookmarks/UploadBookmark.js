import React, { Component } from 'react';

import FineUploaderTraditional from 'fine-uploader-wrappers'
import Gallery from 'react-fine-uploader'

import 'react-fine-uploader/gallery/gallery.css'

const uploader = new FineUploaderTraditional({
    options: {
        autoUpload: true,
        debug: false,
        chunking: {
            enabled: true,
            concurrent: {
                enabled: false
            },
            partSize: 200000, //200KB per chunk
            success: {
                endpoint: `/bookmarkchunkscompleted`
            }
        },
        deleteFile: {
            enabled: false,
        },
        forceMultipart: {
            enabled: true
        },
        request: {
            endpoint: `/bookmarkchunks`,
            forceMultipart: true
        },
        retry: {
            enableAuto: true
        },
        validation: { // validation for the images uploaded
            allowedExtensions: ['html', 'csv', 'txt'],
            sizeLimit: 20971520 // 20 MB = 20 * 1024 * 1024 bytes 20971520
        },
        callbacks: {
            onComplete: (id, name, response) => {
                // console.log(id, name, response);
            },
            onStatusChange: (id, oldStatus, newStatus) => {
                // console.log(id, oldStatus, newStatus);
            },
            onUploadChunkSuccess: (id, chunkData, responseJSON, xhr) => {
                // console.log(id, chunkData, responseJSON);
            },
            onError: (id, name, errorReason, xhr) => {
                // console.log(id, name, errorReason);
            },
            onValidate: (name, buttonContainer) => {
                // console.log(name, buttonContainer);
            }
        }
    }
})

export default class UploadBookmark extends Component {
    constructor(props) {
      super(props);
      this.state = {
      };

    }

    render() {
      return (
        <div className={this.props.visible ? 'show' : 'hide'}>
            <div className="px4 mx2 mt2 mb0">
                <Gallery uploader={ uploader } />
            </div>
        </div>
      )
    }
}

UploadBookmark.propTypes = {
    visible: React.PropTypes.bool
};
