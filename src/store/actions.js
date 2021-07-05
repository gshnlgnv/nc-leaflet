import {
    ADD_DEVICE_MARKER,
    DELETE_DEVICE_MARKER,
    ADD_POLYGON_LAYER,
    CHECKING_LAYER,
    ENABLE_HEAT_LAYER,
    ENABLE_MARKER_MOVEMENT,
    ENABLE_EDIT_CONSOLE,
    SHOW_MODAL,
    POLYGON_NAME, DELETE_POLYGON,
    DELETE_SECOND_POLYGON
} from './consts';

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

export const enableHeatLayer = () => {
    return {
        type: ENABLE_HEAT_LAYER,
    }
}

export const actionMarkerMovement = () => {
    return {
        type: ENABLE_MARKER_MOVEMENT,
    }
}

export const enableEdit = () => {
    return {
        type: ENABLE_EDIT_CONSOLE,
    }
}

export const showModal = () => {
    return {
        type: SHOW_MODAL,
    }
}

export const polygonNameSaving = (name) => {
    return {
        type: POLYGON_NAME,
        payload: name,
    }
}

export const deletePolygon = (id) => {
    return {
        type: DELETE_POLYGON,
        payload: id,
    }
}

export const deleteSecondPolygon = (id => {
    return {
        type: DELETE_SECOND_POLYGON,
        payload: id,
    }
})
