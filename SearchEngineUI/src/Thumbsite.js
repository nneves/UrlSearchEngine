import React, { Component } from 'react';
import './Thumbsite.css';


export default class Thumbsite extends Component {
    render() {
        //return ( <div className='thumbsite bg-blue m2'> { this.props.data } </div> ); 
        return (
          <div className='col col-6 sm-col-4 md-col-3 lg-col-2 mb3 px1'>
            <div className='border bg-white rounded border-black'>
              <a href='#' className='block'>
                  <img src='https://vuematerial.github.io/assets/card-image-1.jpg' className='block' role='presentation' />
              </a>
              <div className='p2'>
                  <h1 className='h4 mt0'>Webite title { this.props.data } </h1>
                  <p className='mb0'>Bacon ipsum dolor sit amet chuck prosciutto landjaeger ham hock filet mignon shoulder hamburger pig venison.</p>
              </div>
            </div>
          </div>
        )

    }
}
