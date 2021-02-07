import React, { useState, useEffect, useRef } from 'react';

function App() {

    const [activeSegment, setActiveSegment] = useState(-1);
    const [startTimer, setStartTimer] = useState(false)
    
    const [seconds, setSeconds] = useState(0);

    useEffect(() => {
        if (startTimer) {
            const timeout = setTimeout(() => {
            setSeconds(seconds + 1);
            }, 1000);
        
            return () => clearTimeout(timeout);
        }
       },[startTimer, seconds]);
    
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
        setStartTimer(true);

        if (activeSegment < segments.length - 1) {
            setActiveSegment(activeSegment + 1);
        } else {
            setActiveSegment(-1);
            setStartTimer(false);
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
                            <td>{activeSegment === index ? seconds : ''}</td>
                            <td></td>
                        </tr>
                    )}
                </tbody>
            </table>

            <button
                type="button"
                className="btn btn-primary btn-lg btn-block"
                onClick={handleClunk}
            >
                { activeSegment === 0 ? 'Start Run' : 'Clunk!' }
            </button>
        </div>
    );
}

export default App;
