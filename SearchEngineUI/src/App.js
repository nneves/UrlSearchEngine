import React, { Component } from 'react';
import Thumbsite from './Thumbsite.js';

function getListOfItems() {
    let list = [1,2,3,4];

    return list.map(( item, index ) => {
        return ( <Thumbsite key={index} data={item} /> );
    });
    
}


class App extends Component {
    render() {
        return ( 
            <div>
                <div className='px4 flex'>
                    add urls here...
                    <input className='input rounded-left' /> <button className='btn btn-narrow btn-primary rounded-right' > Save </button>
                </div>
                <div className='px4 flex'>
                    search here
                    <input className='input rounded-left' /> <button className='btn btn-narrow btn-primary rounded-right' > Go </button>
                </div>
                <div className='m4'>
                    <div className='border center bold rounded-top bg-black white'>
                        find results here
                    </div>
                    <div className='flex'>
                    { getListOfItems() }
                    </div>
                </div> 
            </div> 

        );
    }
}

export default App;