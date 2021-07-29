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

        return myMarkers.map( ({floor, position, markerName, icon, superID, temprature}, index) => {
            if (floor === currentLayer) {

                return(

                        <Marker
                            key={index}
                            position={position}
                            _superID={superID}
                            icon={icon}
                        >
                            <div stlye={{ height: 30, width: 30, backgroundColor: 'red', position: 'absolute'}}>
                                <span>{temprature}</span>
                        </div>

                            <Popup>{markerName}</Popup>
                        </Marker>
                )
            }
        });
    }

    customSVGMarker = () => {
        let temperatureIndicatorColor = '#49ec1c';
        let temperatureValueToSVG = 25;
        let svgToPlace = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40.02 38.58"><defs><style>.cls-1{fill:#fff;stroke:#201600;stroke-width:5px;}.cls-1, .cls-2{stroke-miterlimit:10;}.cls-2{fill:${temperatureIndicatorColor};stroke:#fff;} .cls-3{font-size:12px;fill:#52ac62;font-family:OCRAbyBT-Regular, OCR-A BT;}</style></defs><title>Монтажная область 1</title><circle class="cls-1" cx="19.75" cy="19.61" r="15.37"/><circle class="cls-2" cx="32.12" cy="8.19" r="6.49"/><text class="cls-3" transform="translate(11.94 22.21)">${temperatureValueToSVG}</text></svg>`;

        let iconSettingsNew = {
            mapIconUrl: svgToPlace,
        };

        let divIconNew  = L.divIcon({
            className: "leaflet-data-marker",
            html: L.Util.template(iconSettingsNew.mapIconUrl, iconSettingsNew), //.replace('#','%23'),
            iconAnchor  : [12, 32],
            iconSize    : [60, 60],
            popupAnchor : [0, -28]
        });

        return divIconNew;
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
                        {/*{this.drawMarkers()}*/}

                        <Marker
                            position={[43.6120170985763, 41.59423828125001]}
                            icon={this.customSVGMarker()}
                        >
                            <Popup>Super Device</Popup>
                        </Marker>

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
