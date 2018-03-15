import React, { Component } from 'react';

import FineUploaderTraditional from 'fine-uploader-wrappers';
import Gallery from 'react-fine-uploader';

import 'react-fine-uploader/gallery/gallery.css';

export default class UploadBookmark extends Component {

    uploader = new FineUploaderTraditional({
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
                    this.props.loadManageBookmark();
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
    });

    render() {
      return (
        <div className={this.props.visible ? 'show' : 'hide'}>
            <div className="mx2 mt2 mb0">
                <Gallery uploader={ this.uploader } />
            </div>
        </div>
      )
    }
}

UploadBookmark.propTypes = {
    visible: React.PropTypes.bool,
    loadManageBookmark: React.PropTypes.func,
};
