import React, { Component } from 'react';
//import PropTypes from 'prop-types';

import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

//import Avatar from 'material-ui/Avatar';
//import Chip from 'material-ui/Chip';

//import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
//import FlatButton from 'material-ui/FlatButton';

import SearchPanel from './Search/Search.js';
import SavePanel from './Save/Save.js';
import Cardlist from './Cards/Cardlist.js';
import Messages from './Messages/Messages.js';

//import RaisedButton from 'material-ui/RaisedButton';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

//Messages.openMessage('Hello...',1500);

export default class App extends Component {
    render() {
      return (
          <MuiThemeProvider>
          <div>
            <Messages />
            <SavePanel />
            <SearchPanel />
            <Cardlist />
          </div>
          </MuiThemeProvider>
        );
    }
}

/*
class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <div className="App">
          <div className="App-header">
            <h2>Welcome to React</h2>
          </div>
          <p className="App-intro">
            To get started, edit <code>src/App.js</code> and save to reload.
          </p>
          <div>
            <Chip>
              <Avatar src="https://media2.giphy.com/media/yXPquATCb8kGk/200_s.gif" />
              Image Avatar Chip
            </Chip>
          </div>

          <div>
            Hello
          </div>
        </div>
     </MuiThemeProvider>
    );
  }
}

export default App;
*/


/*
import React, { Component } from 'react';

//import { Button, ButtonToolbar } from 'react-bootstrap';
import Button from 'react-bootstrap/lib/Button';
//import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar';
import ButtonGroup from 'react-bootstrap/lib/ButtonGroup';
import DropdownButton from 'react-bootstrap/lib/DropdownButton';
import MenuItem from 'react-bootstrap/lib/MenuItem';

import SearchPanel from './Search/Search.js';
import SavePanel from './Save/Save.js';
import Cardlist from './Cards/Cardlist.js';
import Messages from './Messages/Messages.js';

class App extends Component {
    render() {
      return ( 
        <div>
          <ButtonGroup>
            <DropdownButton id="dropdown-btn-menu" bsStyle="success" title="Dropdown">
              <MenuItem key="1">Dropdown link</MenuItem>
              <MenuItem key="2">Dropdown link</MenuItem>
            </DropdownButton>
            <Button bsStyle="info">Middle</Button>
            <Button bsStyle="info">Right</Button>
          </ButtonGroup>

          <Messages />
          <SavePanel />
          <SearchPanel />
          <Cardlist />
        </div>
        );
    }
}

export default App;
*/
