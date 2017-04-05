import React, { Component } from 'react';
import './Thumbsite.css';


export default class Thumbsite extends Component {
    render() {
        return ( <div className='thumbsite bg-blue m2'> { this.props.data } </div> ); 
    }
}