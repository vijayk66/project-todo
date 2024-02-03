import React from 'react'

function Tab(props) {


    return (
        <span className={`${props.activeTabId == props.data.id && "text-white fw-bold"}  text-black e-font-3`}
            onClick={props.onClick}>
            {props.data.label}
        </span>
    );
};

export default Tab;