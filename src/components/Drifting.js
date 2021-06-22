import React from 'react'
import {MapContainer, TileLayer, Popup, Tooltip} from "react-leaflet";
import ReactLeafletDriftMarker from "react-leaflet-drift-marker"

function gen_position() {
    return {
        lat: (Math.random() * 360 - 180).toFixed(8),
        lng: (Math.random() * 180 - 90).toFixed(8)
    }
}

export default class Drifting extends React.Component {
    constructor() {
        super();
        this.state = {
            latlng: gen_position()
        }
    }

    componentDidMount() {
        setTimeout(() => {// updates position every 5 sec
            this.setState({latlng: gen_position()})
        }, 5000);
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
