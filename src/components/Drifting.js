import React from 'react';
import {Popup, Tooltip} from "react-leaflet";
import ReactLeafletDriftMarker from "react-leaflet-drift-marker";
import {driftingPositions} from '../store/polygons';

//todo:
// 1) если тогл выключить - надо размонтировать это (componentWillUnmount method)

let intervalTimer;

export default class Drifting extends React.Component {
    constructor() {
        super();
        this.state = {
            latlng: driftingPositions[0],
            arrayIndex: 0,
        }
    }

    gen_position() {
        const {arrayIndex} = this.state;

        if (arrayIndex === (driftingPositions.length - 2)) {
            clearInterval(intervalTimer);
        }

        if (arrayIndex < driftingPositions.length - 1) {

            if (JSON.stringify(this.state.latlng) !== JSON.stringify(driftingPositions[arrayIndex + 1])) {
                this.setState({arrayIndex: this.state.arrayIndex + 1});

                return driftingPositions[arrayIndex + 1];
            }
        }
    }

    componentDidMount() {
        intervalTimer = setInterval(() => {
            this.setState({latlng: this.gen_position()});
        }, 1000);
    }

    render() {
        return (
            <ReactLeafletDriftMarker
                // if position changes, marker will drift its way to new position
                position={this.state.latlng}
                // time in ms that marker will take to reach its destination
                duration={500}
                // icon={iconPerson}
            >
                <Popup>Hi this is a popup</Popup>
                <Tooltip>Hi here is a tooltip</Tooltip>
            </ReactLeafletDriftMarker>
        )
    }
}
