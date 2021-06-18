import React, {Fragment} from 'react';
import {Marker, Popup} from "react-leaflet";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {deleteMarker} from '../store/actions';

class DeviceMarkers extends React.Component {
    mapDeviceMarkers() {
        const {deviceMarkers, currentLayer} = this.props;

        return Object.entries(deviceMarkers).map(([id, deviceInfo]) => {
             if (deviceInfo.floor === currentLayer) {
                 return <Marker
                     key={deviceInfo.key}
                     position={deviceInfo.position}
                     icon={deviceInfo.icon}
                     draggable={deviceInfo.draggable}
                     autoPan={deviceInfo.autoPan}
                 >
                     <Popup>
                         {deviceInfo.content}
                         <button title="edit" onClick={() => console.log('edit')}>edit</button>
                         <button title="delete" onClick={() => {
                             console.log('delete')
                             this.props.deleteMarker(deviceInfo.key)
                         } }>x</button>
                     </Popup>
                 </Marker>
             }
        });
    }

    render() {
        return (
            <Fragment>
                {this.mapDeviceMarkers()}
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        deviceMarkers: state.dataReducer.deviceMarkers,
        currentLayer: state.dataReducer.currentLayer,
    }
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({deleteMarker}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(DeviceMarkers);
