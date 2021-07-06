import React from 'react';
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';
import '../styles/MapClass.css';
import medcentrLogo from '../pics/almazova_logo_text.png';
import {
    addDeviceMarker,
    addPolygonLayer,
    showModal,
    polygonName,
    deletePolygon,
    deleteMarker,
    deleteSecondPolygon
} from '../store/dataSlicer';
import {MapContainer, ImageOverlay, useMap, FeatureGroup, Polygon} from 'react-leaflet';
import {connect} from 'react-redux';
import {PolygonComponent} from "./Polygon";
import {mapLayers} from '../store/polygons'
import {HeatmapFunction} from './HeatLayer';
import Drifting from './Drifting';
import MenuTop from "./MenuTop";
import EditConsole from './EditConsole';
import {ModalPolygonsDraw} from "./ModalPolygonsDraw";

class MapClass extends React.Component {
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
        const {showModalWindow, showModal, polygonName} = this.props;

        const disableModal = () => {
            showModal();
        }

        const fixPolygonName = (name) => {
            polygonName(name);
        }

        return showModalWindow ?
            <ModalPolygonsDraw
                active={showModalWindow}
                disable={disableModal}
                polygonName={fixPolygonName}
            /> : null;
    }

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

    render() {
        const DeletingDoubledPolygonKostil = () => {
            const map = useMap();

            const {secondPolygonsID} = this.props;

            for (let key in map._layers) {
                if (Number(key) === secondPolygonsID) {
                    map.removeLayer(map._layers[key]);
                }
            }

            return null;
        }

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
                    <DeletingDoubledPolygonKostil/>
                    <FeatureGroup>
                        {/*{this.drawDeviceMarkers()}*/}
                        {this.drawMarkerDrifting()}
                        {this.drawHeatMap()}
                        {this.DrawingPolygonsFromState()}
                        {this.drawEditConsole()}
                    </FeatureGroup>
                </MapContainer>
            </div>
        )
    }
}


const mapStateToProps = (state) => (
    {
        deviceMarkers: state.dataReducer.deviceMarkers,
        polygonLayers: state.dataReducer.polygonLayers,
        markerPositions: state.dataReducer.deviceMarkers,
        currentLayer: state.dataReducer.currentLayer,
        heatMap: state.dataReducer.heatMap,
        markerMovement: state.dataReducer.markerMovement,
        editConsoleSwitch: state.dataReducer.editConsole,
        showModalWindow: state.dataReducer.showModalWindow,
        secondPolygonsID: state.dataReducer.secondPolygonsID,
    }
)

const mapDispatchToProps = {
    addDeviceMarker,
    addPolygonLayer,
    showModal,
    polygonName,
    deletePolygon,
    deleteMarker,
    deleteSecondPolygon
};

export default connect(mapStateToProps, mapDispatchToProps)(MapClass);
