import React from 'react';
import {Popup, Tooltip} from "react-leaflet";
import ReactLeafletDriftMarker from "react-leaflet-drift-marker";
import {driftingPositions} from '../store/polygons';

let intervalTimer;

export default class Drifting extends React.Component {
    constructor() {
        super();
        this.state = {
            // latlng: gen_position()
            latlng: driftingPositions[0],
            arrayIndex: 0,
        }
    }

    gen_position() {
            const {arrayIndex} = this.state;

            if (driftingPositions.length > arrayIndex - 1) {
                if ( JSON.stringify(this.state.latlng) !== JSON.stringify(driftingPositions[arrayIndex + 1]) ) {
                    this.setState({arrayIndex: this.state.arrayIndex + 1});
                    return driftingPositions[arrayIndex + 1];
                }
            }

            clearInterval(intervalTimer);
            return null;
    }

    componentDidMount() {
        intervalTimer = setInterval(() => {

            // updates position every 5 sec
            this.setState({latlng: this.gen_position()});
        }, 2000);
    }

    render() {
        return (
            <ReactLeafletDriftMarker
                // if position changes, marker will drift its way to new position
                position={this.state.latlng}
                // time in ms that marker will take to reach its destination
                duration={1000}
                // icon={iconPerson}
            >
                <Popup>Hi this is a popup</Popup>
                <Tooltip>Hi here is a tooltip</Tooltip>
            </ReactLeafletDriftMarker>
        )
    }
}


// default variant
//
// import React from 'react'
// import ReactLeafletDriftMarker from "react-leaflet-drift-marker"
//
// export default class Drifting extends React.Component {
//     constructor() {
//         super();
//         this.state = {
//             latlng: this.gen_position()
//         }
//     }
//
//      gen_position() {
//         return {
//             lat: (Math.random() * 360 - 180).toFixed(8),
//             lng: (Math.random() * 180 - 90).toFixed(8)
//         }
//     }
//
//     componentDidMount() {
//         setTimeout(() => {// updates position every 5 sec
//             this.setState({latlng: this.gen_position()})
//         }, 5000);
//     }
//
//     render() {
//         return (
//             <ReactLeafletDriftMarker
//                 // if position changes, marker will drift its way to new position
//                 position={this.state.latlng}
//                 // time in ms that marker will take to reach its destination
//                 duration={1000}
//                 // icon={iconPerson}
//             >
//             </ReactLeafletDriftMarker>
//         )
//     }
// }
