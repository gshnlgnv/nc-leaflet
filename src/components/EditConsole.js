import React from 'react';
import {EditControl} from "react-leaflet-draw";
import {connect} from 'react-redux';
import L from 'leaflet';
import { showModal, addPolygonLayer, deleteSecondPolygon} from '../store/dataSlicer';

class EditConsole extends React.Component {
    _onEditStart = (e) => {
        console.log('_onEditStart', e);
    };

    _onEditStop = (e) => {
        console.log('_onEditStop', e);

        // how to get polygon id????
        console.log('updated coord:', e.target._layers);
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
                    marker: false,
                }}
            />
        )
    }
}

const mapStateToProps = (state) => ({
    currentLayer: state.dataReducer.currentLayer,
    showModalWindow: state.dataReducer.showModalWindow,
    polygonName: state.dataReducer.polygonName,
});

const mapDispatchToProps = {showModal, addPolygonLayer, deleteSecondPolygon};

export default connect(mapStateToProps, mapDispatchToProps)(EditConsole);
