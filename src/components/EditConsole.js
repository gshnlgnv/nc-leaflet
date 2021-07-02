import React from 'react';
import {FeatureGroup, MapContainer, Polygon} from "react-leaflet";
import {EditControl} from "react-leaflet-draw";
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {showModal, addPolygonLayer} from '../store/actions';
import deviceIcon from "../pics/microchip.png";

class EditConsole extends React.Component {
    render() {
        // names for standart leaflet buttons
        L.drawLocal.draw.toolbar.buttons.polygon = 'Нарисовать полигон1';
        L.drawLocal.draw.toolbar.buttons.polyline = 'Нарисовать линию1';
        L.drawLocal.draw.toolbar.buttons.marker = 'Поставить маркер1';

        // actions on editing layer
        const _onEditPath = (e) => {
            console.log("editing");
        }

        // actions on deleting layer
        const _onDeleted = (e) => {
            console.log("deleted");
        }

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

        // начало рисования
        const _onDrawStart = (e) => {
            console.log("_onDrawStart", e);

            this.props.showModal();
        };

        // конец рисования
        const _onCreate = (e) => {
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
                    latlngs: coordinatesArray(layer.getLatLngs()[0])
                });
            }
        }

        return (
                 <FeatureGroup>
                    <EditControl
                        position='topright'
                        onDrawStart={_onDrawStart}
                        onCreated={_onCreate}
                        // onEdited={_onEditPath}
                        // onDeleted={_onDeleted}
                        draw={{
                            // polyline: true,
                            rectangle: false,
                            circlemarker: false,
                            circle: false,

                            polygon: {
                                shapeOptions: {
                                    color: 'green',
                                    opacity: 0.5,  // polygon border opacity
                                },
                                tooltip: {
                                    start: '- your text-.',
                                    cont: '- your text-.',
                                    end: '- your text-.'
                                }
                            },

                            // marker: {
                            //     icon: deviceIcon123,
                            //     title: "device abc",
                            // }
                        }}
                    />

                </FeatureGroup>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        currentLayer: state.dataReducer.currentLayer,
        showModalWindow: state.dataReducer.showModalWindow,
        polygonName: state.dataReducer.polygonName,
    }
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({showModal, addPolygonLayer}, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(EditConsole);
