import React from 'react'

export default function Button(props) {
    return (
        <div >
            <button className='bigBut clearBut' onClick={props.clear} id='clear'>AC</button>
            <button onClick={props.operators} className='operator' id='divide' value='/'>/</button>
            <button onClick={props.operators} className='operator' id='multiply' value='x'>x</button>
            <button onClick={props.numbers} id='seven' value='7'>7</button>
            <button onClick={props.numbers} id='eight' value='8'>8</button>
            <button onClick={props.numbers} id='nine' value='9'>9</button>
            <button onClick={props.operators} className='operator' id='subtract' value='‑'>-</button>
            <button onClick={props.numbers} id='four' value='4'>4</button>
            <button onClick={props.numbers} id='five' value='5'>5</button>
            <button onClick={props.numbers} id='six' value='6'>6</button>
            <button onClick={props.operators} className='operator' id='add' value='+'>+</button>
            <button onClick={props.numbers} id='one' value='1'>1</button>
            <button onClick={props.numbers} id='two' value='2'>2</button>
            <button onClick={props.numbers} id='three' value='3'>3</button>
            <button className='bigBut' onClick={props.numbers} id='zero' value='0'>0</button>
            <button onClick={props.decimal} id='decimal' value='.'>.</button>
            <button onClick={props.evaluate} className='equalBut' id='equals'>=</button>
        </div>
    )
}
