import React from 'react'

function Timer(props) {


    let d = props.t;
    var h = Math.floor(d / 3600);
    var m = Math.floor(d % 3600 / 60);
    var s = Math.floor(d % 3600 % 60);


    return (
        <div>
            <h1>{h}:{m}:{s}</h1>
        </div>
    )
}

export default Timer
