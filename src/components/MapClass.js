import React from 'react';
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';
import '../styles/MapClass.css';
import medcentrLogo from '../pics/almazova_logo_text.png';

import {MapContainer, ImageOverlay} from 'react-leaflet';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import DeviceMarkers from "./DeviceMarkers";
import {addDeviceMarker, addPolygonLayer, showModal, polygonNameSaving, deletePolygon} from '../store/actions';
import {PolygonComponent} from "./Polygon";
import {mapLayers} from '../store/polygons'
import {HeatmapFunction} from './HeatLayer';
import Drifting from './Drifting';
import MenuTop from "./MenuTop";
import EditConsole from './EditConsole';
import {ModalPolygonsDraw} from "./ModalPolygonsDraw";

class MapClass extends React.Component {
    render() {
        const drawHeatMap = () => {
            const {heatMap, currentLayer} = this.props;

            if (currentLayer) {
                return <HeatmapFunction floor={currentLayer} activeHeat={heatMap}/>
            }
        };

        const drawMarkerDrifting = () => {
            const {markerMovement} = this.props;

            if (markerMovement) {
                return <Drifting markerMovement={markerMovement}/>
            }
        };

        const drawEditConsole = () => {
            const {editConsoleSwitch} = this.props;

            if (editConsoleSwitch) {
                return <EditConsole/>;
            }
        }

        const drawModal = () => {
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
        const drawLayers = () => {
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
        const DrawingPolygonsFromState = () => {
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
        const mapEvent = (eventing) => {
            let e = document.createEvent('Event');

            e.initEvent('click', true, true);
            let cb = document.getElementsByClassName('leaflet-draw-draw-polygon');

            return !cb[0].dispatchEvent(e);
        };

        return (
            <div className="container">
                {drawModal()}
                <div className="map">
                    <MapContainer
                        center={[35, 50]}
                        zoom={5}
                        style={{height: "97vh", width: "100%"}}
                        scrollWheelZoom={true}
                        zoomControl={false}
                    >
                        <MenuTop/>
                        {drawEditConsole()}
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
        editConsoleSwitch: state.dataReducer.editConsole,
        showModalWindow: state.dataReducer.showModalWindow,
    }
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({addDeviceMarker, addPolygonLayer, showModal, polygonNameSaving, deletePolygon}, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(MapClass);
