import React from 'react';
import {useMemo, useState} from 'react';
import {Polygon, Popup} from 'react-leaflet';

export const PolygonComponent = ({polygons, name}) => {
    const [clickedCount, setClickedCount] = useState(0);
    const [currentColor, setColor] = useState({color: 'red'});

    const eventHandlers = useMemo(
        () => ({
            click() {
                setColor({color: 'orange'});
                setClickedCount((count) => count + 1);
            },
        }),
        [],
    )

    console.log('color : ', currentColor);

    return (
        <Polygon
            pathOptions={currentColor}
            positions={polygons}
            eventHandlers={eventHandlers}
        >
            <Popup>
                {name} <br/> Easily customizable. {clickedCount}
            </Popup>
        </Polygon>
    )
}
