import React from 'react';
import {EditControl} from "react-leaflet-draw";
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {showModal, addPolygonLayer} from '../store/actions';
import deviceIcon from "../pics/microchip.png";

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
        const {currentLayer, polygonName} = this.props;

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

    render() {
        // names for standart leaflet buttons
        L.drawLocal.draw.toolbar.buttons.polygon = 'Нарисовать полигон1';
        L.drawLocal.draw.toolbar.buttons.polyline = 'Нарисовать линию1';
        L.drawLocal.draw.toolbar.buttons.marker = 'Поставить маркер1';

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
