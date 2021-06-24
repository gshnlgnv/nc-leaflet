import React from 'react';
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';
import '../styles/MapClass.css';
import medcentrLogo from '../pics/almazova_logo_text.png';
import deviceIcon from '../pics/microchip.png';

import {MapContainer, FeatureGroup, ImageOverlay} from 'react-leaflet';
import {EditControl} from "react-leaflet-draw";
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import DeviceMarkers from "./DeviceMarkers";
import {addDeviceMarker, addPolygonLayer, } from '../store/actions';
import {PolygonComponent} from "./Polygon";
import {mapLayers} from '../store/polygons'
import {HeatmapFunction} from './HeatLayer';
import Drifting from './Drifting';
import MenuTop from "./MenuTop";

class MapClass extends React.Component {
    render() {
        const drawHeatMap = () => {
            const {heatMap, currentLayer} = this.props;

            if (currentLayer && heatMap) {
                return <HeatmapFunction floor={currentLayer} active={heatMap}/>
            }
        };

        const drawMarkerDrifting = () => {
            const {markerMovement} = this.props;

            if (markerMovement) {
                return <Drifting/>
            }
        };

        // names for standart leaflet buttons
        L.drawLocal.draw.toolbar.buttons.polygon = 'Нарисовать полигон';
        L.drawLocal.draw.toolbar.buttons.polyline = 'Нарисовать линию';
        L.drawLocal.draw.toolbar.buttons.marker = 'Поставить маркер';

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
            const {layerType, layer} = e;

            if (layerType === 'polygon') {
                const {_leaflet_id} = layer;

                this.props.addPolygonLayer({id: _leaflet_id, latlngs: coordinatesArray(layer.getLatLngs()[0])});
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

        const coordinatesArray = (incoming) => {
            let result = [];

            incoming.map((coord) => {
                result.push(Object.values(coord));
            })

            return result;
        }

        // drawing svg layers/floors of the building
        const drawLayers = () => {
            const {currentLayer} = this.props;

            if (!currentLayer) {
                return <div className='noMap'><img src={medcentrLogo} alt='logo'/>
                </div>
            }

            return mapLayers.map((layer, index) => {
                if (layer.floor === currentLayer) {
                    return (
                        <div>
                            <ImageOverlay
                                key={index}
                                attribution={layer.attr}
                                url={layer.url}
                                bounds={layer.bounds}
                            />
                        </div>
                    )
                }
            });
        }

        // drawing polygons for particular floor
        const DrawingPolygonsFromState = () => {
            const {polygonLayers, currentLayer} = this.props;

            return polygonLayers.map(({'latlngs': polygons, "roomName": name, "mapLocation": floor}, index) => {
                if (floor === currentLayer) {
                    return <PolygonComponent key={index} polygons={polygons} name={name}/>
                }
            });
        }

        return (
            <div className="container">
                <div className="map">
                    <MapContainer
                        center={[35, 50]}
                        zoom={5}
                        style={{height: "97vh", width: "100%"}}
                        scrollWheelZoom={true}
                        zoomControl={false}
                    >
                        <MenuTop/>
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
                                    // marker: {
                                    //     icon: deviceIcon123,
                                    //     title: "device abc",
                                    // }
                                }}
                            />
                        </FeatureGroup>

                        <DeviceMarkers/>
                        {drawMarkerDrifting()}
                        {drawHeatMap()}
                        {drawLayers()}
                        {DrawingPolygonsFromState()}
                    </MapContainer>

                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        polygonLayers: state.dataReducer.polygonLayers,
        markerPositions: state.dataReducer.deviceMarkers,
        currentLayer: state.dataReducer.currentLayer,
        heatMap: state.dataReducer.heatMap,
        markerMovement: state.dataReducer.markerMovement,
    }
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({addDeviceMarker, addPolygonLayer, }, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(MapClass);
