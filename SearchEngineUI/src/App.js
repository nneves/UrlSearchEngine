import React, { Component } from 'react';

import SearchPanel from './Search/Search.js';
import SavePanel from './Save/Save.js';
import Cardlist from './Cards/Cardlist.js';

class App extends Component {
    render() {
        return ( 
            <div>
                <SavePanel />
                <SearchPanel />
                <Cardlist />
            </div>
        );
    }
}

export default App;
