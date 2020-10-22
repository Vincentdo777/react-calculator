import React from 'react'

export default function Output(props) {
    return (
        <div className="outputDisplay" id="display">
            {props.currentValue}
        </div>
    )
}
