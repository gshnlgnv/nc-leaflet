import React from 'react';
import {heatPoints} from "../store/heatmapPoints";
import 'leaflet.heat';
import {useMap} from 'react-leaflet';
import L from 'leaflet';

export const HeatmapFunction = () => {
    const map = useMap();

    const points = heatPoints
        ? heatPoints.map((p) => {
            return [p[0], p[1], p[2]]; // lat lng intensity
        })
        : [];

    const arr = [];

    return arr.push(L.heatLayer(points).addTo(map));
}
