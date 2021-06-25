import React from 'react';
import {Popup, Tooltip} from "react-leaflet";
import ReactLeafletDriftMarker from "react-leaflet-drift-marker";
import {driftingPositions} from '../store/polygons';

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
        // 1 MARKER START
        // return driftingPositions[0]; // {lat: 18.716980451169885, lng: 33.83789062500001},
            const {arrayIndex} = this.state;

            if ( JSON.stringify(this.state.latlng) !== JSON.stringify(driftingPositions[arrayIndex + 1]) ) {

                console.log('new state is... ');

                 this.setState({latlng: driftingPositions[arrayIndex + 1]});
            }



        // return {
        //     lat: (Math.random() * 360 - 180).toFixed(8),
        //     lng: (Math.random() * 180 - 90).toFixed(8)
        // }
    }

    componentDidMount() {
        console.log('setTimeout starting!');

        setTimeout(() => {

            // updates position every 5 sec
            this.setState({latlng: this.gen_position()});
        }, 3000);
    }

    render() {
        return (
            <ReactLeafletDriftMarker
                // if position changes, marker will drift its way to new position
                position={this.state.latlng}
                // time in ms that marker will take to reach its destination
                duration={2000}
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
