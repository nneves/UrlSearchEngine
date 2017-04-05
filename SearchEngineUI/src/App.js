import React, { Component } from 'react';
import Thumbsite from './Thumbsite.js';

function getListOfItems() {
    let list = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];

    return list.map(( item, index ) => {
        return ( <Thumbsite key={index} data={item} /> );
    });
    
}


class App extends Component {
    render() {
        return ( 
            <div>
                <div className='px4 flex'>
                    <label>Add</label>
                    <input className='input rounded-left' />
                    <button className='btn btn-narrow btn-primary rounded-right' > Save </button>
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
                        <section className='container px2 py3'>
                        { getListOfItems() }
                        </section>
                    </div>

                </div>
            </div>
        );
    }
}

export default App;
