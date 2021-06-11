import {ADD_DEVICE_MARKER, DELETE_DEVICE_MARKER, ADD_POLYGON_LAYER} from './consts';

const customMarker = new L.icon({
    iconUrl: "https://unpkg.com/leaflet@1.5.1/dist/images/marker-icon.png",
    iconSize: [25, 41],
    iconAnchor: [10, 41],
    popupAnchor: [2, -40]
});

const initialState = {
    deviceMarkers: [
        // {
        //     key: 'marker1',
        //     position: [59.927, 30.3086],
        //     content: 'device 123',
        //     draggable: true,
        //     autoPan: true,
        //     icon: customMarker,
        //     title: '123',
        // },
        // {
        //     key: 'marker2',
        //     position: [59.9370, 30.3086],
        //     content: 'device 123',
        //     draggable: true,
        //     autoPan: true,
        //     icon: customMarker
        // },
        // {
        //     key: 'marker3',
        //     position: [59.9475, 30.3086111],
        //     content: 'device 123',
        //     draggable: true,
        //     autoPan: true,
        //     icon: customMarker
        // }
    ],
    polygonLayers: [],
}

export const dataReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_DEVICE_MARKER:
            return {
                ...state,
                deviceMarkers: state.deviceMarkers.concat({
                    key: 'marker4',
                    position: [59.9575, 30.3086111],
                    content: action.payload,
                    draggable: true,
                    autoPan: true,
                    icon: customMarker
                })
            }
        case DELETE_DEVICE_MARKER:
            return {
                ...state,
                deviceMarkers: state.deviceMarkers.filter( item => item.key !== action.payload)
            }
        case ADD_POLYGON_LAYER:
            return {
                ...state,
                polygonLayers: state.polygonLayers.concat(action.payload),
            }
        default:
            return state;
    }
}
