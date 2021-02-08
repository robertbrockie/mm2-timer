import React, { useState, useEffect } from 'react';
import Segments, { Segment, BestSegments } from './Segments';

function App() {
    const [activeSegment, setActiveSegment] = useState(-1);
    const [runningSegments, setRunningSegments] = useState<Array<number>>([]);
    const [prevSegments, setPrevSegments] = useState<Array<number>>([]);
    const [startTimer, setStartTimer] = useState(false);
    const [exportPrev, setExportPrev] = useState(false);
    const [seconds, setSeconds] = useState(0);

    useEffect(() => {
        if (startTimer) {
            const timeout = setTimeout(() => setSeconds(seconds + 1), 1000);
        
            return () => clearTimeout(timeout);
        } else {
            setSeconds(0);
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
            setPrevSegments([...runningSegments]);
            reset();
            
        }
    }

    function reset() {
        setActiveSegment(-1);
        setStartTimer(false);
        setSeconds(0);
        setRunningSegments([]);
    }

    function formatSeconds(seconds:number) {
        if (seconds < 60) {
            return `${seconds}s`;
        } else {
            return `${Math.floor(seconds/60)}m ${seconds % 60}s`;
        }
    }

    if (exportPrev) {
        return <h2>Export</h2>;
    } else {
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
                            <th scope="col" className="text-center">Best</th>
                        </tr>
                    </thead>
                    <tbody>
                        { Segments.map((segment: Segment, index: number) =>
                            <tr key={index}  className={`${activeSegment === index ? 'table-warning' : ''}`}>
                                <th scope="row"><img src={segment.image}/></th>
                                <td className="align-middle text-center">{segment.label}</td>
                                <td className="align-middle text-center ">
                                    {activeSegment === index ? formatSeconds(seconds) : runningSegments[index] ? formatSeconds(runningSegments[index]) : ''}
                                </td>
                                <td className="align-middle text-center">
                                    { prevSegments[index] ? formatSeconds(prevSegments[index]) : ''}
                                </td>
                                <td className="align-middle text-center">
                                    { BestSegments[index] ? formatSeconds(BestSegments[index]) : ''}
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>

                <button
                    type="button"
                    className="btn btn-primary btn-lg btn-block"
                    onClick={handleClunk}
                >
                    { activeSegment === -1 ? 'Let\'s Go!' : 'Clunk!' }
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

                { startTimer === false &&
                    <button
                        type="button"
                        className="btn btn-success btn-lg btn-block"
                        onClick={() => { if(window.confirm('Really that\'s awesome?')) { setExportPrev(true); }}}
                    >
                        Export Previous Run as Best
                    </button>
                }
            </div>
        );
    }
}

export default App;
