import React from 'react';
import './MapClass.css';
import {MapContainer, FeatureGroup, useMapEvent, LayersControl, ImageOverlay, TileLayer, SVGOverlay} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import DeviceMarkers from "./DeviceMarkers";
import {addDeviceMarker, addPolygonLayer} from './actions';
import {EditControl} from "react-leaflet-draw";
import 'leaflet-draw/dist/leaflet.draw.css'
// import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css'; // Re-uses images from ~leaflet package
// import 'leaflet-defaulticon-compatibility';
import deviceIcon from '../pics/microchip.png';
import svg1 from '../pics/floorplan.svg';
import svg2 from '../pics/floorplan-1.svg';


class MapClass extends React.Component {
    render() {
        L.drawLocal.draw.toolbar.buttons.polygon = 'Нарисовать полигон';
        L.drawLocal.draw.toolbar.buttons.polyline = 'Нарисовать линию';
        L.drawLocal.draw.toolbar.buttons.marker = 'Поставить маркер';

        // click handler on map
        function MyComponent() {
            const map = useMapEvent('click', (e) => {
                console.log("clicked");
            })

            return null
        }

        // drawing polygon with custom button
        const mapEvent = (eventing) => {
            let e = document.createEvent('Event');
            e.initEvent('click', true, true);
            let cb = document.getElementsByClassName('leaflet-draw-draw-polygon');

            return !cb[0].dispatchEvent(e);
        };

        // actions on editing layer
        const _onEditPath = (e) => {
            console.log("editing");
        }

        // actions on create layer
        const _onCreate = (e) => {
            console.log("created");

            const {layerType, layer} = e;

            if (layerType === 'polygon') {
                const {_leaflet_id} = layer;

                this.props.addPolygonLayer({id: _leaflet_id, latlngs: layer.getLatLngs()[0]})
            }
        }

        // actions on deleting layer
        const _onDeleted = (e) => {
            console.log("deleted");
        }

        const _onDrawStart = (e) => {
            console.log("_onDrawStart", e);
        };

        // custom marker icon
        let deviceIcon123 = L.icon({
            iconUrl: deviceIcon,
            iconSize: [25, 41],
            iconAnchor: [10, 41],
            popupAnchor: [2, -40],
        });

        return (
            <div className="container">
                <div className="aside">
                    <div className="mapMenu">
                        <p>Меню</p>
                        <button className="buttons" onClick={(eventing) => mapEvent(eventing)}>Полигон</button>
                        <button className="buttons" onClick={() => this.props.addDeviceMarker("МАРКЕР")}>Маркер</button>
                        <div>
                            <select >
                                <option>Компания 1</option>
                                <option>Компания 2</option>
                            </select>
                        </div>

                        <div>
                            <input type="file" />
                        </div>
                    </div>
                </div>
                <div className="map">
                    <div className="map__container">
                        <MapContainer
                            center={[50, 50]}
                            zoom={4}
                            style={{height: "90vh", width: "100%"}}
                            scrollWheelZoom={true}
                        >

                            <LayersControl position="topright">

                                <LayersControl.BaseLayer checked name="1 этаж">
                                    <ImageOverlay
                                        attribution='Netcube office map 1'
                                        url={svg1} bounds={[[0, 0], [60, 100],]}
                                        // style={{vectorEffect: "non-scaling-stroke"}}
                                    />
                                </LayersControl.BaseLayer>

                                {/*<LayersControl.BaseLayer checked name="2 этаж">*/}
                                {/*    <ImageOverlay attribution='Netcube office map 2' url={svg2} bounds={[[0, 0], [60, 100],]}/>*/}
                                {/*</LayersControl.BaseLayer>*/}

                                <FeatureGroup>
                                    <EditControl
                                        position='topright'
                                        onEdited={_onEditPath}
                                        onCreated={_onCreate}
                                        onDeleted={_onDeleted}
                                        onDrawStart={_onDrawStart}
                                        draw={{
                                            rectangle: false,
                                            circlemarker: false,
                                            circle: false,
                                            polygon: {
                                                shapeOptions: {
                                                    color: '#97009c',
                                                    opacity: 0.5,  // polygon border opacity
                                                }
                                            },
                                            marker: {
                                                icon: deviceIcon123,
                                                title: "device abc",
                                            }
                                        }}
                                    />
                                </FeatureGroup>

                                {/*click handler on map*/}
                                {/*<MyComponent/>*/}

                                {/*// standard map*/}
                                {/*<TileLayer*/}
                                {/*    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'*/}
                                {/*    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"*/}
                                {/*/>*/}

                                <DeviceMarkers/>
                            </LayersControl>
                        </MapContainer>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        polygonLayers: state.dataReducer.polygonLayers,
    }
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({addDeviceMarker, addPolygonLayer}, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(MapClass);
