import React from 'react';
import {useMemo, useState} from 'react';
import {Polygon, Popup} from 'react-leaflet';

export const PolygonComponent = ({polygons, name, id, deletePol}) => {
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


// fillRule: "evenodd"
// interactive: true
// lineCap: "round"
// lineJoin: "round"
// maintainColor: false
// noClip: false
// opacity: 0.5
// pane: "overlayPane"
// smoothFactor: 1
// stroke: true


        >
            <Popup>
                {name} <br/>
                Easily customizable. {clickedCount}  <br/>
                <button onClick={() => deletePol(id)}>delete polygon</button>
            </Popup>
        </Polygon>
    )
}
