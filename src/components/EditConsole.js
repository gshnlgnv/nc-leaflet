import React from 'react';
import {EditControl} from "react-leaflet-draw";
import {connect} from 'react-redux';
import L from 'leaflet';
import { showModal, addPolygonLayer, deleteSecondPolygon, editingPolygonCoordinates, addMyMarker} from '../store/dataSlicer';
import {mapLayers} from '../store/polygons';

class EditConsole extends React.Component {
    _onEditStart = (e) => {
        console.log('_onEditStart', e);
    };

    _onEditStop = (e) => {
        console.log('_onEditStop', e);

       const leafletEditingLayer = e.sourceTarget.attributionControl._attributions;
       let layerAttribtuteName = '';

       for (let key in leafletEditingLayer) {
           layerAttribtuteName = key;
       }

       let floorKey = '';

        mapLayers.map( item => {
            if (item.attr === layerAttribtuteName) {
                floorKey = item.floor;
            }
        })

        const {polygonLayers, editingPolygonCoordinates} = this.props;
        const editedLayers = e.sourceTarget._layers;
        let polygonsUpdatedCoordinates = {};

        for (let key in editedLayers) {
            if (editedLayers[key].options._superID) {
                polygonsUpdatedCoordinates[editedLayers[key].options._superID] = editedLayers[key].editing.latlngs[0][0].map( coordinates => {
                        return [coordinates.lat, coordinates.lng];
                    })
            }
        }

        for (let key in polygonsUpdatedCoordinates) {
            for (let i = 0 ; i < polygonLayers.length; i++) {
                if (polygonLayers[i].superID === key) {
                    editingPolygonCoordinates({id: polygonLayers[i].superID, coord: polygonsUpdatedCoordinates[key]})
                }
            }
        }
    }

    // перехват входящих точек нового полигона
     coordinatesArray = (incoming) => {
        let result = [];

        incoming.map((coord) => {
            result.push(Object.values(coord));
        })

        return result;
    }

    // конец рисования
     _onCreated = (e) => {
        const {layerType, layer} = e;
        const {currentLayer, polygonName, deleteSecondPolygon, addPolygonLayer} = this.props;

        if (layerType === 'marker') {
            const {_leaflet_id} = layer;
            const {addMyMarker} = this.props;

            addMyMarker({
                id: _leaflet_id,
                mapLocation: currentLayer,
                markerName: polygonName,
                latlngs: [layer._latlng.lat, layer._latlng.lng]
            });
        }

        if (layerType === 'polygon') {
            const {_leaflet_id} = layer;

            // отправка ID ненужного полигона
            deleteSecondPolygon(_leaflet_id);

            addPolygonLayer({
                id: _leaflet_id,
                superID: `${currentLayer}${_leaflet_id}`,
                mapLocation: currentLayer,
                roomName: polygonName,
                latlngs: this.coordinatesArray(layer.getLatLngs()[0])
            });
        }
    }

    render() {
          // names for standart leaflet buttons
        L.drawLocal.draw.toolbar.buttons.polygon = 'Нарисовать полигон';
        L.drawLocal.draw.toolbar.buttons.marker = 'Поставить маркер';

        const _onDrawStart = (e) => {
            console.log("_onDrawStart", e);
            this.props.showModal();
        };

        return (
            <EditControl
                position="topright"
                onDrawStart={_onDrawStart}
                onCreated={this._onCreated}
                onEditStart={this._onEditStart}
                onEditStop={this._onEditStop}
                draw={{
                    rectangle: false,
                    polyline: false,
                    circle: false,
                    circlemarker: false,
                }}
            />
        )
    }
}

const mapStateToProps = (state) => ({
    currentLayer: state.dataReducer.currentLayer,
    showModalWindow: state.dataReducer.showModalWindow,
    polygonName: state.dataReducer.polygonName,
    polygonLayers: state.dataReducer.polygonLayers,
});

const mapDispatchToProps = {showModal, addPolygonLayer, deleteSecondPolygon, editingPolygonCoordinates, addMyMarker};

export default connect(mapStateToProps, mapDispatchToProps)(EditConsole);
