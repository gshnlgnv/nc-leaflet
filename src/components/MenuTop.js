import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {layerTypeChecking, enableHeatLayer, actionMarkerMovement} from '../store/actions';
import '../styles/MenuTop.css';
import medcentrLogo from "../pics/unnamed.jpg";

class MenuTop extends React.Component {
    enableHeatLayer() {
        this.props.enableHeatLayer();
    }

    enableMarkerMovement() {
        this.props.actionMarkerMovement();
    }

    render() {
        const handleSelectChange = (event) => {
            this.props.layerTypeChecking(event.target.value);
        }

        return (
            <div className='asideMenu'>

                <div className='asideMenu__block'>
                    <img style={{width: 40, height: 40}} src={medcentrLogo} alt='logo'/>
                </div>

                <div className='asideMenu__block'>
                    <select onChange={handleSelectChange}>
                        <option value="" selected disabled hidden>Выбрать этаж</option>
                        <option value="1F">1 этаж</option>
                        <option value="2F">2 этаж</option>
                        <option value="3F">3 этаж</option>
                    </select>
                </div>

                <div className='asideMenu__block'>
                    <div className='asideMenu__block_heatSwitcher'>
                        <label className="switch">
                            <input type="checkbox" onChange={() => this.enableHeatLayer()}/>
                            <span className="slider round"></span>
                        </label>
                        <div className="asideMenu__block_heatSwitcher_text">Тепловая карта</div>
                    </div>
                </div>

                <div className='asideMenu__block'>
                    <div className='asideMenu__block_heatSwitcher'>
                        <label className="switch">
                            <input type="checkbox" onChange={() => this.enableMarkerMovement()}/>
                            <span className="slider round"></span>
                        </label>
                        <div className="asideMenu__block_heatSwitcher_text">Переместить маркер</div>
                    </div>
                </div>


            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({layerTypeChecking, enableHeatLayer, actionMarkerMovement}, dispatch)
};

export default connect(null, mapDispatchToProps)(MenuTop);
