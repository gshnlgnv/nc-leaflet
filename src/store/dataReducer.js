import {
    ADD_DEVICE_MARKER,
    DELETE_DEVICE_MARKER,
    ADD_POLYGON_LAYER,
    CHECKING_LAYER,
    ENABLE_HEAT_LAYER,
    ENABLE_MARKER_MOVEMENT,
    ENABLE_EDIT_CONSOLE,
    SHOW_MODAL,
    POLYGON_NAME,
    DELETE_POLYGON,
    DELETE_SECOND_POLYGON
} from './consts';
import {kabinets, markers} from "./polygons";

const customMarker = new L.icon({
    iconUrl: "https://unpkg.com/leaflet@1.5.1/dist/images/marker-icon.png",
    iconSize: [25, 41],
    iconAnchor: [10, 41],
    popupAnchor: [2, -40]
});

const initialState = {
    deviceMarkers: markers,
    polygonLayers: kabinets,
    currentLayer: null,
    heatMap: null,
    markerMovement: false,
    editConsole: false,
    showModalWindow: false,
    polygonName: null,
    secondPolygonsID: null,
}

export const dataReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_DEVICE_MARKER:
            return {
                ...state,
                deviceMarkers: state.deviceMarkers.concat(
                    {
                        key: 'marker4',
                        position: [59.9575, 30.3086111],
                        content: action.payload,
                        draggable: true,
                        autoPan: true,
                        icon: customMarker
                    }
                )
            }
        case DELETE_DEVICE_MARKER:
            return {
                ...state,
                deviceMarkers: state.deviceMarkers.filter(item => item.key !== action.payload)
            }
        case ADD_POLYGON_LAYER:
            return {
                ...state,
                polygonLayers: state.polygonLayers.concat(action.payload),
            }
        case CHECKING_LAYER:
            return {
                ...state,
                currentLayer: action.payload,
            }
        case ENABLE_HEAT_LAYER:
            return {
                ...state,
                heatMap: !state.heatMap,
            }
        case ENABLE_MARKER_MOVEMENT:
            return {
                ...state,
                markerMovement: !state.markerMovement,
            }
        case ENABLE_EDIT_CONSOLE:
            return {
                ...state,
                editConsole: !state.editConsole,
            }
        case SHOW_MODAL:
            return {
                ...state,
                showModalWindow: !state.showModalWindow,
            }
        case POLYGON_NAME:
            return {
                ...state,
                polygonName: action.payload,
            }
        case DELETE_POLYGON:
            return {
                ...state,
                polygonLayers: state.polygonLayers.filter(item => item.id !== action.payload)
            }
        case DELETE_SECOND_POLYGON:
            return {
                ...state,
                secondPolygonsID: action.payload,
            }
        default:
            return state;
    }
};
