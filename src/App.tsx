import React, { useState, useEffect } from 'react';
import Segments, { Segment, BestSegments } from './Segments';
import Promo from './Promo';
import { formatSeconds } from './utils/time';

function App() {
    const [activeSegment, setActiveSegment] = useState(-1);
    const [runningSegments, setRunningSegments] = useState<Array<number>>([]);
    const [prevSegments, setPrevSegments] = useState<Array<number>>([]);
    const [startTimer, setStartTimer] = useState(0);
    const [exportPrev, setExportPrev] = useState(false);
    const [seconds, setSeconds] = useState(0);
    const [key, setKey] = useState(undefined);

    useEffect(() => {
        if (startTimer) {
            const timeout = setTimeout(() => setSeconds(Date.now() - startTimer), 100);
        
            return () => clearTimeout(timeout);
        } else {
            setSeconds(0);
        }
    }, [startTimer, seconds]);

    useEffect(() => {
        const keyHandler = (event: { keyCode: any; }) => {
            const { keyCode } = event;

            switch (keyCode) {
                case 32: //space (clunk!)
                    handleClunk();
                    break;
                case 114: // r (reset)
                    handleReset();
                    break;
            }

            setKey(key);
        }

        window.addEventListener('keypress', keyHandler);
        return () => window.removeEventListener('keypress', keyHandler);
    }, [key, activeSegment, seconds]);

    function handleClunk() {
        if (startTimer === 0) {
            setStartTimer(Date.now());
        }

        if (activeSegment < Segments.length) {
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
        setStartTimer(0);
        setSeconds(0);
        setRunningSegments([]);
    }

    function handleReset() {
        if (window.confirm('Are you sure?')) {
            reset();
        }
    }

    function handleExport() {
        if (window.confirm('Really that\'s awesome?')) {
            setExportPrev(true);
        }
    }

    return (
        <div className="container">
            <Promo />
            <img className="logo" src="/images/logo.png"/>
            <br/>
            { exportPrev ? 
                <React.Fragment>
                    <pre>{JSON.stringify(prevSegments, null, 2)}</pre>
                    <button
                        type="button"
                        className="btn btn-success btn-lg btn-block"
                        onClick={() => setExportPrev(false)}
                    >
                        Back
                    </button>
                </React.Fragment>
                :
                <React.Fragment>
                    <table className="table table-borderless table-sm">
                        <thead>
                            <tr>
                                <th scope="col"></th>
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
                                    <th scope="row"><img className="split" src={segment.image}/></th>
                                    <td className="split-label align-middle">{segment.label}</td>
                                    <td>
                                    {activeSegment > index ?
                                        <div className={`align-middle text-center alert ${runningSegments[index] - BestSegments[index] > 0 ? 'alert-danger' : 'alert-success'}`} role="alert">
                                            {formatSeconds(Math.abs(runningSegments[index] - BestSegments[index]))}
                                        </div>
                                        :
                                        ''
                                    }
                                    </td>
                                    <td className="align-middle text-center split-current">
                                        {activeSegment === index ? formatSeconds(seconds) : runningSegments[index] ? formatSeconds(runningSegments[index]) : ''}
                                    </td>
                                    <td className="align-middle text-center split-prev">
                                        { prevSegments[index] ? formatSeconds(prevSegments[index]) : ''}
                                    </td>
                                    <td className="align-middle text-center split-best">
                                        { BestSegments[index] ? formatSeconds(BestSegments[index]) : ''}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>

                    <button
                        type="button"
                        className="btn btn-primary btn-lg btn-block"
                        onClick={() => handleClunk()}
                    >
                        { activeSegment === -1 ? 'Let\'s Go!' : 'Clunk!' }
                    </button>

                    { startTimer ? 
                        <button
                            type="button"
                            className="btn btn-danger btn-lg btn-block"
                            onClick={handleReset}
                        >
                            Reset
                        </button>
                        :
                        prevSegments.length > 0 ?
                            <button
                                type="button"
                                className="btn btn-success btn-lg btn-block"
                                onClick={handleExport}
                            >
                                Export Previous Run as Best
                            </button>
                            :
                            null
                    }
                </React.Fragment>
            }
        </div>
    );
}

export default App;
