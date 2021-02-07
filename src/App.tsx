import React, { useState, useLayoutEffect } from 'react';
import { act } from 'react-dom/test-utils';

function App() {

    const [activeSegment, setActiveSegment] = useState(0);
    
    const segments = [
        { label: 'Flash Man' },
        { label: 'Air Man' },
        { label: 'Quick Man' },
        { label: 'Metal Man' },
        { label: 'Bubble Man' },
        { label: 'Heat Man' },
        { label: 'Crash Man' },
        { label: 'Wood Man' },
        { label: 'Mecha Dragon' },
        { label: 'Picopico-kun' },
        { label: 'Gut Tanks' },
        { label: 'Wily Machine 2' }, 
        { label: 'Alien' },
    ];

    function handleClunk() {
        if (activeSegment < segments.length - 1) {
            setActiveSegment(activeSegment + 1);
        } else {
            setActiveSegment(0);
        }
    }

    return (
        <div className="container">
            <h1>Mega Man Timer</h1>
            <br/>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Segment</th>
                        <th scope="col">Current</th>
                        <th scope="col">Past</th>
                    </tr>
                </thead>
                <tbody>
                    { segments.map((segment, index) =>
                        <tr key={index}  className={`${activeSegment === index ? 'table-warning' : ''}`}>
                            <th scope="row">{segment.label}</th>
                            <td>{index}</td>
                            <td></td>
                        </tr>
                    )}
                </tbody>
            </table>

            <button
                type="button"
                className="btn btn-primary btn-lg btn-block"
                onClick={handleClunk}
            >Clunk!</button>
        </div>
    );
}

export default App;
