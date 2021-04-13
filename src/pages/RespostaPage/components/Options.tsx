import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import styles from "./Options.module.sass"

const Options = (props : {selected: boolean, option: string, onClick?: () => void}) => {
    return (
        <div
            className={props.selected ?
                styles.marked  + ' ' + styles.option_container :
                styles.option_container}
            onClick={props.onClick}>
            <div className={styles.checkbox}/>
            <div>{props.option}</div>
        </div>
    );
}

export default Options;