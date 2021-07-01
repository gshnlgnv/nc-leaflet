import React from 'react';
import {FeatureGroup, MapContainer} from "react-leaflet";
import {EditControl} from "react-leaflet-draw";
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {showModal, addPolygonLayer} from '../store/actions';


class EditConsole extends React.Component {
    render() {
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

            console.log('open modal >>>');
            this.props.showModal();
        };

        // конец рисования
        const _onCreate = (e) => {
            const {layerType, layer} = e;
            const {currentLayer, polygonName} = this.props;

            // if (layerType === 'polyline') {
            //     console.log(layer);
            // }

            if (layerType === 'polygon') {
                const {_leaflet_id} = layer;

                console.log('polygonNamepolygonName ==', polygonName);

                this.props.addPolygonLayer({
                    id: _leaflet_id,
                    mapLocation: currentLayer,
                    roomName: polygonName,
                    latlngs: coordinatesArray(layer.getLatLngs()[0])
                });
            }
        }

        return(
            <div>
                <FeatureGroup>
                    <EditControl
                        position='topright'

                        onDrawStart={_onDrawStart}
                        onCreated={_onCreate}
                        // onEdited={_onEditPath}
                        // onDeleted={_onDeleted}

                        draw={{
                            // polyline: true,
                            // rectangle: false,
                            // circlemarker: false,
                            // circle: false,
                            polygon: {
                                shapeOptions: {
                                    color: '#97009c',
                                    opacity: 0.5,  // polygon border opacity
                                }
                            },
                            // marker: {
                            //     icon: deviceIcon123,
                            //     title: "device abc",
                            // }
                        }}
                    />
                </FeatureGroup>
            </div>
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
