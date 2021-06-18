import waterPNG from '../pics/water.png';
import wcPNG from '../pics/wc-sign.png';
import exitPNG from '../pics/exit.png';

export const kabinets = [
    {
        "id": 161,
        "mapLocation": '1F',
        "roomName": 'Компната успеха',
        "latlngs":
            [
                [49.236856459404386, 52.99804687500001],
                [48.34315335714132, 52.47070312500001],
                [43.90607125022639, 60.29296875000001],
                [49.96092024809691, 61.17187500000001]
            ]
    },
    {
        "id": 88,
        "mapLocation": '1F',
        "roomName": 'Компната дзена',
        "latlngs": [
            [40.06682998053946, 67.93945312500001],
            [39.440614948906024, 65.65429687500001],
            [41.3149257840003, 49.21875000000001],
            [51.07149237137289, 41.22070312500001]
        ]
    },
    {
        "id": 86,
        "mapLocation": '2F',
        "roomName": 'Компната капитана',
        "latlngs": [
            [63.62737000078943, 63.10546875000001],
            [60.37149401377553, 55.45898437500001],
            [58.07927009846465, 66.44531250000001],
            [61.773994243987566, 71.71875000000001]
        ]
    }
];

const exitICON = new L.icon({
    // iconUrl: "https://unpkg.com/leaflet@1.5.1/dist/images/marker-icon.png",
    iconUrl: exitPNG,
    iconSize: [25, 41],
    iconAnchor: [10, 41],
    popupAnchor: [2, -40]
});

const waterICON = new L.icon({
    // iconUrl: "https://unpkg.com/leaflet@1.5.1/dist/images/marker-icon.png",
    iconUrl: waterPNG,
    iconSize: [25, 41],
    iconAnchor: [10, 41],
    popupAnchor: [2, -40]
});

const wcICON = new L.icon({
    // iconUrl: "https://unpkg.com/leaflet@1.5.1/dist/images/marker-icon.png",
    iconUrl: wcPNG,
    iconSize: [25, 41],
    iconAnchor: [10, 41],
    popupAnchor: [2, -40]
});

export const markers = [
    {
        key: 'marker1',
        floor: '1F',
        position: [59.927, 31.13176],
        content: 'device 1',
        draggable: true,
        autoPan: true,
        icon: waterICON,
        title: '1',
    },
    {
        key: 'marker2',
        floor: '1F',
        position: [59.927, 35.23286],
        content: 'device 2',
        draggable: true,
        autoPan: true,
        icon: wcICON,
        title: '2',
    },
    {
        key: 'marker3',
        floor: '2F',
        position: [59.927, 39.3396],
        content: 'device 3',
        draggable: true,
        autoPan: true,
        icon: exitICON,
        title: '3',
    },
];

