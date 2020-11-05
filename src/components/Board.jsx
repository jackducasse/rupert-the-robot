import { times } from 'lodash';
import React from 'react';
import { COLS, ROWS } from '../constants';

import './Board.css';

export const Board = ({
    position,
    projectedPosition,
    onPlace,
}) => (
    <div className="Board">
        <div className="container">
            {times(ROWS, rowIndex => (
                <div key={rowIndex} className="row">
                    {times(COLS, colIndex=> {
                        const isRobotHere = position.x === colIndex && position.y === rowIndex;
                        const isProjectionHere = projectedPosition.x === colIndex && projectedPosition.y === rowIndex;
                        const gridCoords = { x: colIndex, y: rowIndex };
                        return (
                        <div 
                            key={colIndex} 
                            className="column"
                        >
                            {isRobotHere && (
                                <div 
                                    className="rupert"
                                    style={{transform: `rotate(${90 * position.f}deg)`}}
                                />
                            )}
                            {isProjectionHere && (
                                <div
                                    className="rupert projection"
                                    style={{transform: `rotate(${90 * projectedPosition.f}deg)`}}
                                />
                            )}
                            <div className="placementDirections">
                                <button className="direction north" onClick={() => onPlace({...gridCoords, f: 0})}>&#x2B06;</button>
                                <div>
                                <button className="direction west" onClick={() => onPlace({...gridCoords, f: 3})}>&#x2B05;</button>
                                {/* Can't seem to find a left pointing arrow of this same style.. */}
                                <button className="direction east" style={{transform: 'rotate(180deg)'}} onClick={() => onPlace({...gridCoords, f: 1})}>&#x2B05;</button> 
                                </div>
                                <button className="direction south" onClick={() => onPlace({...gridCoords, f: 2})}>&#x2B07;</button>
                            </div>
                        </div>
                        );
                    })}
                </div>
            ))}
        </div>
    </div>
);