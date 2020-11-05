import { map } from 'lodash';
import React from 'react';

import './CommandQueue.css';

export const CommandQueue = ({
    commands,
}) => (
    <div className="CommandQueue">
        <div className="container">
            {map(commands, ({name, position}, index) => (
                <div className="command">
                    <span className="index">{index}:</span>
                    {name} {position && (`: ${[position.x, position.y, position.f].join(', ')}`)}
                </div>
            ))}
        </div>
    </div>
);