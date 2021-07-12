import React from 'react';
import 'leaflet/dist/leaflet.css';
import {MapContainer, LayersControl,TileLayer} from 'react-leaflet';

export const Test = () => {
    return(
        <div>
            <MapContainer
                center={[35, 50]}
                zoom={5}
                style={{height: "100vh", width: "100%"}}
                scrollWheelZoom={true}
                zoomControl={false}
            >
                <LayersControl position="topright">
                    <LayersControl.BaseLayer checked name="OpenStreetMap.Mapnik">
                        <TileLayer
                            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                    </LayersControl.BaseLayer>

                    <LayersControl.BaseLayer name="OpenStreetMap.BlackAndWhite">
                        <TileLayer
                            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png"
                        />
                    </LayersControl.BaseLayer>

                    </LayersControl>
            </MapContainer>
        </div>
    )
}
