import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {layerTypeChecking} from '../store/actions';
import './MenuTop.css';

class MenuTop extends React.Component {
    render() {
        const handleSelectChange = (event) => {
            this.props.layerTypeChecking(event.target.value);
        }

        return (
            <div className='asideMenu'>

                <select onChange={handleSelectChange}>
                    <option value="" selected disabled hidden>Выбрать этаж</option>
                    <option value="1F">1 этаж</option>
                    <option value="2F">2 этаж</option>
                    <option value="3F">3 этаж</option>
                </select>

                <div style={{display: 'flex', flexDirection: 'row'}}>
                    <label className="switch">
                        <input type="checkbox"/>
                        <span className="slider round"></span>
                    </label>
                    <div>Тепловая карта</div>
                </div>

            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({layerTypeChecking}, dispatch)
};

export default connect(null, mapDispatchToProps)(MenuTop);
