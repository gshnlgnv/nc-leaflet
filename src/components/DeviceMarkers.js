import React from 'react';
import {Marker, Popup} from "react-leaflet";

export const TEST_DeviceMarkers = ( {deviceMarkers, currentLayer, deleteMarker}) => {
    if (currentLayer) {
        return deviceMarkers.map(marker => {
            if (marker.floor === currentLayer) {
                return <Marker
                    key={marker.key}
                    position={marker.position}
                    icon={marker.icon}
                    draggable={marker.draggable}
                    autoPan={marker.autoPan}
                >
                    <Popup>
                        {marker.content}
                        <button title="edit" onClick={() => console.log('edit')}>edit</button>
                        <button title="delete" onClick={() => {
                            deleteMarker(marker.key)
                        }}>
                            x
                        </button>
                    </Popup>
                </Marker>
            }
        })
    }

    return null;
}
//
// import React from 'react';
// import {Marker, Popup} from "react-leaflet";
//
// export const TEST_DeviceMarkers = ( {deviceMarkers, currentLayer, deleteMarker}) => {
//     if (currentLayer) {
//         return deviceMarkers.map(marker => {
//             if (marker.floor === currentLayer) {
//                 return <Marker
//                     key={marker.key}
//                     position={marker.position}
//                     icon={marker.icon}
//                     draggable={marker.draggable}
//                     autoPan={marker.autoPan}
//                 >
//                     <Popup>
//                         {marker.content}
//                         <button title="edit" onClick={() => console.log('edit')}>edit</button>
//                         <button title="delete" onClick={() => {
//                             deleteMarker(marker.key)
//                         }}>
//                             x
//                         </button>
//                     </Popup>
//                 </Marker>
//             }
//         })
//     }
//
//     return null;
// }
