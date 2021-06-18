import {ADD_DEVICE_MARKER, DELETE_DEVICE_MARKER, ADD_POLYGON_LAYER, CHECKING_LAYER} from './consts';

export const addDeviceMarker = (data) => {
    return {
        type: ADD_DEVICE_MARKER,
        payload: data,
    }
}

export const deleteMarker = (id) => {
    return {
        type: DELETE_DEVICE_MARKER,
        payload: id,
    }
}

export const addPolygonLayer = (data) => {
    return {
        type: ADD_POLYGON_LAYER,
        payload: data,
    }
}

export const layerTypeChecking = (layer) => {
    return {
        type: CHECKING_LAYER,
        payload: layer,
    }
}


