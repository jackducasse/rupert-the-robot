import React from 'react';

export const Controls = ({
    isReady,
    onLeft,
    onRight,
    onMove,
    onGo,
}) => (
    isReady ? (
        <p>Select a square to start.</p>
    ) : (
        <div className="container">
        <p>
            Select a new square at anytime to move the robot directly. 
            Otherwise, use the <i>Left</i>, <i>Right</i>, and <i>Move</i> buttons to map out a path for the robot. 
            Click <i>Go</i> once done, to move the robot to the destination.
        </p>
        <div className="row">
            <button onClick={onLeft}>Left</button>
            <button onClick={onMove} className="forward">Move</button>
            <button onClick={onRight}>Right</button>
        </div>

        <div className="row">
            <button onClick={onGo} className="submit">Go!</button>
        </div>
        </div>
    )
);
