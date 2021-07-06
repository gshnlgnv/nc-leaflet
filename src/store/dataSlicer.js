import {createSlice} from "@reduxjs/toolkit";
import {kabinets, markers} from "./polygons";

const dataReducerSlice = createSlice({
    name: 'dataReducer',
    initialState: {
        // deviceMarkers: markers,
        polygonLayers: kabinets,
        currentLayer: null,
        heatMap: null,
        markerMovement: false,
        editConsole: false,
        showModalWindow: false,
        polygonName: null,
        secondPolygonsID: null,
    },
    reducers: {
        addDeviceMarker(state, action) {
            state.deviceMarkers.filter(item => item.key !== action.payload)
        },
        addPolygonLayer(state, action) {
            state.polygonLayers = state.polygonLayers.concat(action.payload);
        },
        checkingLayer(state, action) {
            state.currentLayer = action.payload;
        },
        enableHeatLayer(state) {
           state.heatMap = !state.heatMap;
        },
        enableMarkerMovement(state) {
           state.markerMovement = !state.markerMovement;
        },
        enableEditConsole(state) {
            state.editConsole = !state.editConsole;
        },
        showModal(state) {
            state.showModalWindow = !state.showModalWindow;
        },
        polygonName(state, action) {
            state.polygonName = action.payload;
        },
        deletePolygon(state, action) {
            state.polygonLayers = state.polygonLayers.filter(item => item.id !== action.payload);
        },
        deleteSecondPolygon(state,action) {
            state.secondPolygonsID = action.payload;
        },
        deleteMarker(state,action) {
            state.deviceMarkers = state.deviceMarkers.filter(item => item.key !== action.payload)
        }
    },
})

export const {
    addDeviceMarker,
    addPolygonLayer,
    checkingLayer,
    enableHeatLayer,
    enableMarkerMovement,
    enableEditConsole,
    showModal,
    polygonName,
    deletePolygon,
    deleteSecondPolygon,
    deleteMarker
} = dataReducerSlice.actions;

export default dataReducerSlice.reducer;


