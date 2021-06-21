import React from 'react';
import {MapContainer, FeatureGroup, ImageOverlay, Polygon, Popup, useMapEvent} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import 'leaflet-draw/dist/leaflet.draw.css';
import {EditControl} from "react-leaflet-draw";
import '../styles/MapClass.css';
import DeviceMarkers from "./DeviceMarkers";
import {addDeviceMarker, addPolygonLayer, layerTypeChecking} from '../store/actions';
import deviceIcon from '../pics/microchip.png';
import svg1 from '../pics/floorplan.svg';
import svg2 from '../pics/floorplan-1.svg';
import medcentrLogo from '../pics/unnamed.jpg';
import {PolygonComponent} from "./Polygon";

class MapClass extends React.Component {
    constructor() {
        super();
        this.state = {
            count: 0
        }
    }



    render() {
        const handleSelectChange = (event) => {
            this.props.layerTypeChecking(event.target.value);
        }

        console.log('state = ', this.state.count);

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

        const DrawingPolygonsFromState = () => {
            // const purpleOptions = {color: 'red'};
            const {polygonLayers, currentLayer} = this.props;

            return polygonLayers.map(({'latlngs': polygons, "roomName": name, "mapLocation": floor}, index) => {
                if (floor === currentLayer) {

                    return (

                        <PolygonComponent key={index} polygons={polygons} name={name}/>

                        // <Polygon
                        //     key={index}
                        //     // pathOptions={purpleOptions}
                        //     positions={polygons}
                        //     color='green'
                        //     // ?????????????????????????????????????
                        //     // https://react-leaflet.js.org/docs/example-tooltips
                        //     // eventHandlers={polygonHandler}
                        // >
                        //     <Popup>
                        //         {name} <br/> Easily customizable.
                        //     </Popup>
                        // </Polygon>
                    )
                }
            });
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

        const drawLayers = () => {
            const {currentLayer} = this.props;

            const mapLayers = [
                {
                    floor: '1F',
                    attr: 'МедЦентр 1 этаж',
                    url: svg1,
                    bounds: [[0, 0], [60, 100],]
                },
                {
                    floor: '2F',
                    attr: 'МедЦентр 2 этаж',
                    url: svg2,
                    bounds: [[0, 0], [60, 100],]
                }
            ];

            if (!currentLayer) {
                return <div className='noMap'><img src={medcentrLogo} alt='logo'/></div>
            }

            return mapLayers.map( (layer, index) => {
                if (layer.floor === currentLayer) {
                    return (
                            <ImageOverlay
                                key={index}
                                attribution={layer.attr}
                                url={layer.url}
                                bounds={layer.bounds}
                            />
                    )
                }
            });
        }

        return (
            <div className="container">
                <div className="map">
                        <select onChange={handleSelectChange} >
                            <option value="" selected disabled hidden>Выбрать этаж</option>
                            <option value="1F">1 этаж</option>
                            <option value="2F">2 этаж</option>
                        </select>
                        <MapContainer
                            center={[50, 50]}
                            zoom={4}
                            style={{height: "97vh", width: "100%"}}
                            scrollWheelZoom={true}
                            zoomControl={false}
                        >

                            {/*<FeatureGroup>*/}
                            {/*    <EditControl*/}
                            {/*        position='topright'*/}
                            {/*        onEdited={_onEditPath}*/}
                            {/*        onCreated={_onCreate}*/}
                            {/*        onDeleted={_onDeleted}*/}
                            {/*        onDrawStart={_onDrawStart}*/}
                            {/*        draw={{*/}
                            {/*            rectangle: false,*/}
                            {/*            circlemarker: false,*/}
                            {/*            circle: false,*/}
                            {/*            polygon: {*/}
                            {/*                shapeOptions: {*/}
                            {/*                    color: '#97009c',*/}
                            {/*                    opacity: 0.5,  // polygon border opacity*/}
                            {/*                }*/}
                            {/*            },*/}
                            {/*            // marker: {*/}
                            {/*            //     icon: deviceIcon123,*/}
                            {/*            //     title: "device abc",*/}
                            {/*            // }*/}
                            {/*        }}*/}
                            {/*    />*/}
                            {/*</FeatureGroup>*/}

                            {drawLayers()}
                            <DeviceMarkers/>
                            <DrawingPolygonsFromState/>
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
    }
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({addDeviceMarker, addPolygonLayer, layerTypeChecking}, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(MapClass);
