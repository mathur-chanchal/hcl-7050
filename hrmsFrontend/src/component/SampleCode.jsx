import React, { useEffect, useState } from 'react'

function SampleCode({ empdata }) {
    const [counter, setCounter] = useState(20);
    const [pointer, setPointer] = useState(100);

    useEffect(() => {
        console.log("Counter= " + counter);
        console.log("Pointer= " + pointer);
    }, [counter, pointer]);

    function changeCounter() {
        setCounter(counter + 1);
        setPointer(pointer - 1);
    }

    return (
        <div>
            <h2>Counter Value : {counter}</h2>
            <h2>Pointer Value : {pointer}</h2>
            <button onClick={changeCounter}>Change Counter</button>
        </div>
    );
}

export default SampleCode;
