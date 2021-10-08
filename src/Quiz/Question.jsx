import React from 'react'

function Question(props) {
    return (
        <div className='question' >
            <h1>Q.{props.n}</h1>
            <h2  > {props.q}</h2>
        </div>
    )
}

export default Question
