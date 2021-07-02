import React from 'react';
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';
import '../styles/MapClass.css';
import medcentrLogo from '../pics/almazova_logo_text.png';

import {MapContainer, ImageOverlay, useMapEvents, useMap, FeatureGroup, Polygon} from 'react-leaflet';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import DeviceMarkers from "./DeviceMarkers";
import {
    addDeviceMarker,
    addPolygonLayer,
    showModal,
    polygonNameSaving,
    deletePolygon,
    deleteMarker
} from '../store/actions';
import {PolygonComponent} from "./Polygon";
import {mapLayers} from '../store/polygons'
import {HeatmapFunction} from './HeatLayer';
import Drifting from './Drifting';
import MenuTop from "./MenuTop";
import EditConsole from './EditConsole';
import {ModalPolygonsDraw} from "./ModalPolygonsDraw";
import {EditControl} from "react-leaflet-draw";
import {TEST_DeviceMarkers} from './testMarkers';

class MapClass extends React.Component {
    DeviceMarkers = () => {
        const {currentLayer, deviceMarkers, deleteMarker} = this.props;

        return currentLayer ? <TEST_DeviceMarkers
            deviceMarkers={deviceMarkers}
            currentLayer={currentLayer}
            deleteMarker={deleteMarker}
        /> : null;
    }

    drawHeatMap() {
        const {heatMap, currentLayer} = this.props;

        if (currentLayer) {
            return <HeatmapFunction floor={currentLayer} activeHeat={heatMap}/>
        }
    };

     drawMarkerDrifting = () => {
        const {markerMovement} = this.props;

        if (markerMovement) {
            return <Drifting markerMovement={markerMovement}/>
        }
    };

     drawEditConsole = () => {
        const {editConsoleSwitch} = this.props;

        if (editConsoleSwitch) {
            return <EditConsole/>;
        }
    }

     drawModal = () => {
        const {showModalWindow, showModal, polygonNameSaving} = this.props;

        const disableModal = () => {
            showModal();
        }

        const fixPolygonName = (name) => {
            polygonNameSaving(name);
        }

        return showModalWindow ?
            <ModalPolygonsDraw
                active={showModalWindow}
                disable={disableModal}
                polygonName={fixPolygonName}
            /> : null;
    }

    // drawing svg layers/floors of the building
     drawLayers = () => {
        const {currentLayer} = this.props;

        if (!currentLayer) {
            return <div className='noMap'><img src={medcentrLogo} alt='logo'/>
            </div>
        }

        return mapLayers.map((layer, index) => {
            if (layer.floor === currentLayer) {
                return <ImageOverlay
                    key={index}
                    attribution={layer.attr}
                    url={layer.url}
                    bounds={layer.bounds}
                />
            }
        });
    }

    // drawing polygons for particular floor
     DrawingPolygonsFromState = () => {
        const {polygonLayers, currentLayer} = this.props;

        if (!polygonLayers) {
            return null;
        }

        const deletePol = (id) => {
            this.props.deletePolygon(id);
        }

        return polygonLayers.map(({'id': id, 'latlngs': polygons, "roomName": name, "mapLocation": floor}, index) => {
            if (floor === currentLayer) {

                return <PolygonComponent key={index} polygons={polygons} name={name} id={id} deletePol={deletePol}/>
            }
        });
    }

// drawing polygon with custom button
     mapEvent(eventing) {
        let e = document.createEvent('Event');

        e.initEvent('click', true, true);
        let cb = document.getElementsByClassName('leaflet-draw-draw-polygon');

        return !cb[0].dispatchEvent(e);
    };

     MyComponent() {
        const map = useMapEvents({
            click: () => {
                console.log('map = ',map);

                // L.map.layers
                console.log('L.map.layers = ', map.layers);
            },
        })

        return null
    }

    // // начало рисования
    //  _onDrawStart(e) {
    //     console.log("_onDrawStart", e);
    //     const {showModal} = this.props;
    //
    //    showModal();
    // };

    // конец рисования
     _onCreated = (e) => {
        const {layerType, layer} = e;
        const {currentLayer, polygonName} = this.props;

        // if (layerType === 'polyline') {
        //     console.log(layer);
        // }

        console.log('e',e);

        if (layerType === 'polygon') {
            const {_leaflet_id} = layer;

            this.props.addPolygonLayer({
                id: _leaflet_id,
                mapLocation: currentLayer,
                roomName: polygonName,
                latlngs: this.coordinatesArray(layer.getLatLngs()[0])
            });
        }
    }

    coordinatesArray = (incoming) => {
        let result = [];

        incoming.map((coord) => {
            result.push(Object.values(coord));
        })

        return result;
    }

     _onEditStart = (e) => {
        console.log('_onEditStart', e);
    };

    render() {
       const _onDrawStart = (e) => {
            console.log("_onDrawStart", e);
            const {showModal} = this.props;

            showModal();
        };

        return (
            <div className="container">
                {this.drawModal()}
                    <MapContainer
                        center={[35, 50]}
                        zoom={5}
                        style={{height: "100vh", width: "100%"}}
                        scrollWheelZoom={true}
                        zoomControl={false}
                    >
                        <MenuTop/>
                        {this.drawLayers()}

                        <FeatureGroup>

                            {/*{drawEditConsole()}*/}
                            {/*<MyComponent />*/}


                            {/*этa падла всё рушит !!!!!!!!!!!!!!!!*/}
                            {/*{this.DeviceMarkers()}*/}


                            {this.drawMarkerDrifting()}
                            {this.drawHeatMap()}
                            {this.DrawingPolygonsFromState()}

                            <EditControl
                                position="topright"

                                onDrawStart={_onDrawStart}

                                onEdited={this._onEdited}
                                // onCreate={this._onCreate}
                                onCreated={this._onCreated}
                                onDeleted={this._onDeleted}
                                onMounted={this._onMounted}
                                onEditStart={this._onEditStart}
                                onEditStop={this._onEditStop}
                                onDeleteStart={this._onDeleteStart}
                                onDeleteStop={this._onDeleteStop}
                                draw={{
                                    rectangle: false,
                                }}
                            />
                        </FeatureGroup>
                    </MapContainer>
                {/*</div>*/}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        deviceMarkers: state.dataReducer.deviceMarkers,
        polygonLayers: state.dataReducer.polygonLayers,
        markerPositions: state.dataReducer.deviceMarkers,
        currentLayer: state.dataReducer.currentLayer,
        heatMap: state.dataReducer.heatMap,
        markerMovement: state.dataReducer.markerMovement,
        editConsoleSwitch: state.dataReducer.editConsole,
        showModalWindow: state.dataReducer.showModalWindow,
    }
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({addDeviceMarker, addPolygonLayer, showModal, polygonNameSaving, deletePolygon, deleteMarker}, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(MapClass);
