import React from 'react';
import {useMemo, useState} from 'react';
import {Polygon, Popup} from 'react-leaflet';

export const PolygonComponent = ({polygons, name, id, deletePol, superID}) => {
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

    return (
        <Polygon
            _superID={superID}
            pathOptions={currentColor}
            positions={polygons}
            eventHandlers={eventHandlers}
            fill={true}
            fillColor={'green'}
            fillOpacity={0.5}
            weight={4}
            edit={true}
            bubblingMouseEvents={true}
            clickable={true}
            dashArray={null}
            dashOffset={null}
        >
            <Popup>
                {name} <br/>
                Easily customizable. {clickedCount}  <br/>
                <button onClick={() => deletePol(id)}>delete polygon</button>
            </Popup>
        </Polygon>
    )
}
