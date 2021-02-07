import React from 'react';

function App() {

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
    ]
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
                    { segments.map(segment =>
                        <tr>
                            <th scope="row">{segment.label}</th>
                            <td></td>
                            <td></td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default App;
