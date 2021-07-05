import React from 'react';
import '../styles/ModalPolygonsDraw.css';

export const ModalPolygonsDraw = ({active, disable, polygonName}) => {
    let polygonNameRef = React.createRef();

    return(
        <div className={` ${active ? "modal active" : "modal"} `}>
            <div className='modal__content'>
                <p>Введите имя нового полигона</p>
                <input type='text' placeholder='Название...' ref={polygonNameRef}/>
                <button onClick={ () => {
                    polygonName(polygonNameRef.current.value);
                    disable();
                }}>Сохранить и выйти</button>
                <p className='modal__information'>* Отменить отрисовку полигона можно будет после закрытия этого окна</p>
            </div>
        </div>
    )
}
