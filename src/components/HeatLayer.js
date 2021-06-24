import React from 'react';
import {heatPointsMock} from "../store/heatmapPoints";
import 'leaflet.heat';
import {useMap} from 'react-leaflet';
import L from 'leaflet';

export const HeatmapFunction = ({floor, active}) => {
    const map = useMap();

    console.log('heatMap', active);
    console.log('floor', floor);




    for (let i = 0; i < heatPointsMock.length; i++) {
        if (heatPointsMock[i].floor === floor) {
            const points = heatPointsMock
                ? heatPointsMock[i].points.map((p) => {
                    return [p[0], p[1], p[2]]; // lat lng intensity
                })
                : [];

            const pointsList = [];

            const heatLayer = L.heatLayer(points).addTo(map)

            if (!active) {
                map.removeLayer(heatLayer);
            }

            return pointsList.push(heatLayer);
        }
    }

    return null;
}
