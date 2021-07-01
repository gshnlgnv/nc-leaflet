import React from 'react';
import '../styles/ModalPolygonsDraw.css';

export const ModalPolygonsDraw = ({active, disable, polygonName}) => {
    let polygonNameRef = React.createRef();

    return(
        <div className={` ${active ? "modal" : ""} `}>
            <div className='modal__content'>
                <span>modal</span>
                <input type='text' placeholder='input polygon name' ref={polygonNameRef}/>
                <button onClick={ () => {
                    polygonName(polygonNameRef.current.value);
                    disable();
                }}>save & close modal</button>
            </div>
        </div>
    )
}
