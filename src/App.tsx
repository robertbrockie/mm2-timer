import React, { useState, useEffect } from 'react';
import Segments, { Segment } from './Segments';

function App() {
    const [activeSegment, setActiveSegment] = useState(-1);
    const [startTimer, setStartTimer] = useState(false);
    const [seconds, setSeconds] = useState(0);

    useEffect(() => {
        if (startTimer) {
            const timeout = setTimeout(() => setSeconds(seconds + 1), 1000);
        
            return () => clearTimeout(timeout);
        }
    }, [startTimer, seconds]);

    function handleClunk() {
        setStartTimer(true);

        if (activeSegment < Segments.length - 1) {
            setActiveSegment(activeSegment + 1);
        } else {
            reset();
        }
    }

    function reset() {
        setActiveSegment(-1);
        setSeconds(0);
        setStartTimer(false);
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
                    { Segments.map((segment: Segment, index: number) =>
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
                { activeSegment === -1 ? 'Start Run' : 'Clunk!' }
            </button>

            { startTimer && 
                <button
                    type="button"
                    className="btn btn-danger btn-lg btn-block"
                    onClick={() => { if(window.confirm('Are you sure?')) { reset(); }}}
                >
                    Reset
                </button>
            }
        </div>
    );
}

export default App;
