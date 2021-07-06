import React from 'react';
import {EditControl} from "react-leaflet-draw";
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
// import {showModal, addPolygonLayer, deleteSecondPolygon} from '../store/actions';
import deviceIcon from "../pics/microchip.png";

import { showModal, addPolygonLayer, deleteSecondPolygon} from '../store/dataSlicer';

import L from 'leaflet';

class EditConsole extends React.Component {
    _onEditStart = (e) => {
        console.log('_onEditStart', e);
    };

    // actions on editing layer
     _onEditPath = (e) => {
        console.log("editing");
    }

    // actions on deleting layer
     _onDeleted = (e) => {
        console.log("deleted");
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

        if (layerType === 'polygon') {
            const {_leaflet_id} = layer;

            // отправка ID ненужного полигона
            deleteSecondPolygon(_leaflet_id);

            addPolygonLayer({
                id: _leaflet_id,
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

        // custom marker icon
        let deviceIcon123 = L.icon({
            iconUrl: deviceIcon,
            iconSize: [25, 41],
            iconAnchor: [10, 41],
            popupAnchor: [2, -40],
        });

        return (
            <EditControl
                position="topright"
                onDrawStart={_onDrawStart}
                onEdited={this._onEdited}
                onCreated={this._onCreated}
                onDeleted={this._onDeleted}
                onMounted={this._onMounted}
                onEditStart={this._onEditStart}
                onEditStop={this._onEditStop}
                onDeleteStart={this._onDeleteStart}
                onDeleteStop={this._onDeleteStop}
                draw={{
                    rectangle: false,
                    polyline: false,
                    circle: false,
                    circlemarker: false,
                    marker: false,
                }}
            />
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

const mapDispatchToProps = {showModal, addPolygonLayer, deleteSecondPolygon};

// const mapDispatchToProps = (dispatch) => {
//     return bindActionCreators({showModal, addPolygonLayer, deleteSecondPolygon}, dispatch)
// };

export default connect(mapStateToProps, mapDispatchToProps)(EditConsole);
