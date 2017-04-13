import React, { Component } from 'react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';

//import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
//import FlatButton from 'material-ui/FlatButton';


export default class Message extends Component {
    render() {
        return (
          <div>
            <MuiThemeProvider>
              <Chip>
                <Avatar src="https://media2.giphy.com/media/yXPquATCb8kGk/200_s.gif" />
                Image Avatar Chip
              </Chip>
            </MuiThemeProvider>
          </div>
        )

    }
}

/*
            <div className="bold center p2 mb2 white bg-red rounded">
              Warning! Half-pound burger will be deleted
            </div>
            <div className="bold center p2 mb2 bg-yellow rounded">
              Onion rings cannot connect to the network
            </div>
            <div className="bold center p2 white bg-green rounded">
              Fries added to order
            </div>
*/
