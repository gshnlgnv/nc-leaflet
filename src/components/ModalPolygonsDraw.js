import React from 'react';
import '../styles/ModalPolygonsDraw.css';

export const ModalPolygonsDraw = ({active, disable, polygonName}) => {
    let polygonNameRef = React.createRef();

    return(
        <div className={` ${active ? "modal active" : "modal"} `}>
            <div className={"modal__content"}>
                <div className="modal__content_text">
                    <div className='modal_block'>Введите имя нового полигона</div>
                    <div className='modal_block'><input type='text' placeholder='Название...' ref={polygonNameRef}/></div>
                    <div className='modal_block'>
                        <button onClick={ () => {
                            polygonName(polygonNameRef.current.value);
                            disable();
                        }}>Сохранить и выйти</button>
                    </div>

                    <div className='modal_block'><p className='modal__information'>* Отменить отрисовку полигона можно будет после закрытия этого окна</p></div>
                </div>

            </div>
        </div>
    )
}
