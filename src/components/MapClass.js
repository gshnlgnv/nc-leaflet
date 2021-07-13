import React from 'react';
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';
import '../styles/MapClass.css';
import {
    addDeviceMarker,
    addPolygonLayer,
    showModal,
    polygonName,
    deletePolygon,
    deleteMarker,
    deleteSecondPolygon
} from '../store/dataSlicer';
import {MapContainer, ImageOverlay, useMap, FeatureGroup, Popup, Marker, Polygon} from 'react-leaflet';
import {connect} from 'react-redux';
import {PolygonComponent} from "./Polygon";
import {mapLayers} from '../store/polygons'
import {HeatmapFunction} from './HeatLayer';
import Drifting from './Drifting';
import MenuTop from "./MenuTop";
import EditConsole from './EditConsole';
import {ModalPolygonsDraw} from "./ModalPolygonsDraw";
import medcentrLogo from '../pics/almazova_logo_text.png';
import L from "leaflet";
import wcPNG from "../pics/wc-sign.png";

class MapClass extends React.Component {
    drawHeatMap() {
        const {heatMap, currentLayer} = this.props;

        return currentLayer ? <HeatmapFunction floor={currentLayer} activeHeat={heatMap}/> : null;
    };

    drawMarkerDrifting = () => this.props.markerMovement ? <Drifting markerMovement={this.props.markerMovement}/> : null;

    drawEditConsole = () => this.props.editConsoleSwitch ? <EditConsole/> : null;

    drawModal = () => {
        const {showModalWindow, showModal, polygonName} = this.props;

        const disableModal = () => {
            showModal();
        }

        const setPolygonName = (name) => {
            polygonName(name);
        }

        return showModalWindow ?
            <ModalPolygonsDraw
                active={showModalWindow}
                disable={disableModal}
                polygonName={setPolygonName}
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
                    _floor={layer.floor}
                    key={index}
                    attribution={layer.attr}
                    url={layer.url}
                    bounds={layer.bounds}
                />
            }
        });
    }

    drawPolygons = () => {
        const {polygonLayers, currentLayer} = this.props;

        if (!polygonLayers) {
            return null;
        }

        const deletePol = (id) => {
            this.props.deletePolygon(id);
        }


        return polygonLayers.map(({'id': id, 'superID': superID, 'latlngs': polygons, "roomName": name, "mapLocation": floor}, index) => {
            if (floor === currentLayer) {
                return <PolygonComponent key={index} polygons={polygons} name={name} id={id} deletePol={deletePol} superID={superID}/>
            }
        });
    }

    drawMarkers = () => {
        const {myMarkers, currentLayer} = this.props;

        // const iicon = new L.icon({
        //     // iconUrl: "https://unpkg.com/leaflet@1.5.1/dist/images/marker-icon.png",
        //     iconUrl: wcPNG,
        //     iconSize: [25, 41],
        //     iconAnchor: [10, 41],
        //     popupAnchor: [2, -40]
        // });

        return myMarkers.map( ({mapLocation, latlngs, markerName, icon, superID}, index) => {
            if (mapLocation === currentLayer) {
                return(
                    <Marker
                        key={index}
                        position={latlngs}
                        _superID={superID}
                        // icon={iicon}
                    >
                        <Popup>{markerName}</Popup>
                    </Marker>
                )
            }
        });
    }

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

        console.log('mndaksdma', this.props.myMarkers);

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
                        {this.drawMarkerDrifting()}
                        {this.drawHeatMap()}
                        {this.drawPolygons()}
                        {this.drawEditConsole()}
                        {this.drawMarkers()}
                    </FeatureGroup>
                </MapContainer>
            </div>
        )
    }
}


const mapStateToProps = (state) => (
    {
        deviceMarkers: state.dataReducer.deviceMarkers,
        myMarkers: state.dataReducer.myMarkers,
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
