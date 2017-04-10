import React, { Component } from 'react';

export default class Message extends Component {
    render() {
        return (
            <div className="bold center p2 mb2 white bg-red rounded">
              Warning! Half-pound burger will be deleted
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
