import React from 'react';
import {heatPointsMock} from "../store/heatmapPoints";
import 'leaflet.heat';
import {useMap} from 'react-leaflet';
import L from 'leaflet';
import '../styles/MapClass.css';

let currentHeatLayer = null;

export const HeatmapFunction = ({floor, activeHeat}) => {
    const map = useMap();
    const pointsList = [];

    if (activeHeat === null) {
        return null;
    }

    if (activeHeat === false) {
        map.removeLayer(currentHeatLayer);
    }

    if (floor && activeHeat === true) {
        for (let i = 0; i < heatPointsMock.length; i++) {
            if (heatPointsMock[i].floor === floor) {
                const points = heatPointsMock
                    ? heatPointsMock[i].points.map((p) => {
                        return [p[0], p[1], p[2]]; // lat lng intensity
                    })
                    : [];

                let drawingHeatLayer = L.heatLayer(points).addTo(map);

                currentHeatLayer = drawingHeatLayer;

                return pointsList.push(drawingHeatLayer);
            }
        }
    }

    return null;
}


