import React, { Component } from 'react';

import SearchPanel from './Search/Search.js';
import SavePanel from './Save/Save.js';
import Cardlist from './Cards/Cardlist.js';
import Messages from './Messages/Messages.js';

class App extends Component {
    render() {
        return ( 
            <div>
                <Messages />
                <SavePanel />
                <SearchPanel />
                <Cardlist />
            </div>
        );
    }
}

export default App;
