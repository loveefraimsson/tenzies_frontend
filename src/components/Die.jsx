import React, { useState } from 'react';


function Die(props) {

    const styleHeld = {
        backgroundColor: props.isHeld ? '#59E391' : '#FFFFFF'
    }

    return(
        <div onClick={() => props.holdDice(props.id)} style={styleHeld} className='die'>
            <h2 className='dieNumber'>{props.value}</h2>
        </div>
    )
}


export default Die;