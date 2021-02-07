import React, { useState, useEffect } from 'react';
import Segments, { Segment } from './Segments';

function App() {
    const [activeSegment, setActiveSegment] = useState(-1);
    const [runningSegments, setRunningSegments] = useState<Array<number>>([]);
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
            // store the last time
            if (activeSegment != -1) {
                let newRunningSegments = [...runningSegments, seconds];
                setRunningSegments(newRunningSegments);
            }

            setActiveSegment(activeSegment + 1);
        } else {
            reset();
        }
    }

    function reset() {
        setActiveSegment(-1);
        setSeconds(0);
        setRunningSegments([]);
        setStartTimer(false);
    }

    function formatSeconds(seconds:number) {
        return seconds;
    }

    return (
        <div className="container">
            <h1>Mega Man 2 Speedrun Timer</h1>
            <br/>
            <table className="table table-borderless table-sm">
                <thead>
                    <tr>
                        <th scope="col"></th>
                        <th scope="col"></th>
                        <th scope="col" className="text-center">Current</th>
                        <th scope="col" className="text-center">Past</th>
                    </tr>
                </thead>
                <tbody>
                    { Segments.map((segment: Segment, index: number) =>
                        <tr key={index}  className={`${activeSegment === index ? 'table-warning' : ''}`}>
                            <th scope="row"><img src={segment.image}/></th>
                            <td className="align-middle text-center">{segment.label}</td>
                            <td className="align-middle text-center ">
                                {activeSegment === index ? formatSeconds(seconds) : runningSegments[index] ? runningSegments[index] : ''}
                            </td>
                            <td className="align-middle text-center"></td>
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
