import L from 'leaflet';
import waterPNG from '../pics/water.png';
import wcPNG from '../pics/wc-sign.png';
import exitPNG from '../pics/exit.png';
import almazov_1 from "../pics/almazov_1.png";
import almazov_2 from "../pics/almazov_2.png";
import almazov_3 from "../pics/almazov_3.png";

export const kabinets = [
    {
        "id": 161,
        "mapLocation": '1F',
        "roomName": 'Компната успеха',
        'color': 'red',
        "latlngs":
            [
                [35.406014197115184, 41.63818359375001],
                [36.31426425035886, 43.72558593750001],
                [35.63851636745109, 45.63720703125],
                [36.544110163899006, 46.93359375000001],
                [37.78735827632107, 44.384765625],
                [39.38468788816397, 42.97851562500001],
                [40.53002981135877, 43.22021484375],
                [41.67254212388531, 44.75830078125001],
                [41.14515301223135, 46.36230468750001],
                [41.49173505924277, 47.26318359375001],
                [43.6120170985763, 41.59423828125001],
                [42.55278834233865, 39.37500000000001],
                [40.84661687794648, 37.77099609375001],
                [39.0953605373934, 37.48535156250001],
                [37.456664225622085, 38.3203125],
                [36.10149550050499, 40.03417968750001],
            ]
    },
    {
        "id": 88,
        "mapLocation": '1F',
        "roomName": 'Компната дзена',
        "latlngs": [
            [48.5162184305039, 59.00683593750001],
            [48.399635990057185, 52.44873046875001],
            [45.84347421156739, 52.47070312500001],
            [45.78220897597499, 59.89746093750001],
            [48.50166026589054, 59.74316406250001],
        ]
    },
    {
        "id": 86,
        "mapLocation": '2F',
        "roomName": 'Компната капитана',
        "latlngs": [
            [26.026734422151407, 56.00830078125],
            [28.265439496347035, 58.65600585937501],
            [27.273833211944684, 61.45751953125001],
            [26.4111481618814, 62.87475585937501],
            [24.905833849466198, 58.33740234375001],
        ]
    },
    {
        "id": 86,
        "mapLocation": '3F',
        "roomName": 'Компната капитана',
        "latlngs": [
            [25.082201393908356, 52.91015625000001],
            [20.093261371835624, 52.82226562500001],
            [20.0106916502021, 56.60156250000001],
            [23.882307444311433, 56.55761718750001],
            [24.803252938950575, 55.107421875],
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
        position: [19.927, 50.13176],
        content: 'device 1',
        draggable: true,
        autoPan: true,
        icon: waterICON,
        title: '1',
    },
    {
        key: 'marker2',
        floor: '2F',
        position: [8.927, 45.23286],
        content: 'device 2',
        draggable: true,
        autoPan: true,
        icon: wcICON,
        title: '2',
    },
    {
        key: 'marker3',
        floor: '3F',
        position: [45.927, 60.3396],
        content: 'device 3',
        draggable: true,
        autoPan: true,
        icon: exitICON,
        title: '3',
    },
];

export const mapLayers = [
    {
        floor: '1F',
        attr: 'МедЦентр 1 этаж',
        url: almazov_1,
        bounds: [[0, 0], [60, 100],]
    },
    {
        floor: '2F',
        attr: 'МедЦентр 2 этаж',
        url: almazov_2,
        bounds: [[0, 0], [60, 100],]
    },
    {
        floor: '3F',
        attr: 'МедЦентр 3 этаж',
        url: almazov_3,
        bounds: [[0, 0], [60, 100],]
    }
];

export const driftingPositions = [
    {lat: 18.716980451169885, lng: 33.83789062500001},
    {lat: 19.132780998205387, lng: 43.33007812500001},
    {lat: 24.356443190908603, lng: 46.14257812500001},
    {lat: 26.026929236088506, lng: 51.50390625000001},
    {lat: 35.88225126483626, lng: 51.416015625},
    {lat: 37.71240151304932, lng: 46.66992187500001},
    {lat: 40.64208040801466, lng: 44.56054687500001},
    {lat: 43.448603693904175, lng: 51.59179687500001},
    {lat: 46.73658069295916, lng: 50.97656250000001},
    {lat: 46.676295900788936, lng: 57.21679687500001},
]
