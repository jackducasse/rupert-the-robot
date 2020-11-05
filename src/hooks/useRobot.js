import { concat } from 'lodash';
import React from 'react';
import { COLS, ROWS } from '../constants';


const RELATIVE_MOVE_MAP = {
    0: {x: 0, y: 1},
    1: {x: 1, y: 0},
    2: {x: 0, y: -1},
    3: {x: -1, y: 0},
}

export const useRobot = ({onReport} = {}) => {
    const [position, setPosition] = React.useState({});
    const [projectedPosition, setProjectedPosition] = React.useState({});

    const [commandQueue, setCommandQueue] = React.useState([]);
    const addToCommandQueue = (name, pos) => {
        setCommandQueue(queue => concat(queue, {name, position: pos}));
    };

    const PLACE = ({x, y, f}) => {
        setCommandQueue([{name: 'PLACE', position: {x, y, f}}]);
        setPosition({x, y, f});
        setProjectedPosition({x, y, f});
    };
    const MOVE = () => {
        addToCommandQueue('MOVE');
        setProjectedPosition(({x, y, f}) => {
            const relativeMove = RELATIVE_MOVE_MAP[f];
            const newX = x + relativeMove.x;
            const newY = y + relativeMove.y;
            if(
                (newX < 0 || newX > (ROWS - 1)) ||
                (newY < 0 || newY > (COLS - 1))
            ) {
                return {x, y, f};
            }
            const newPosition = {x: newX, y: newY, f};
            return newPosition;
        });
    };
    const rotate = (direction) => {
        setProjectedPosition(({x, y, f}) => {
            let newBearing = f + direction;
            if(newBearing < 0 || newBearing > 3) newBearing += (-direction * 4);

            console.log('newBearing', newBearing);

            return {
                x,
                y,
                f: newBearing,
            }
        });
    };
    const LEFT = () => {
        addToCommandQueue('LEFT');
        rotate(-1);
    };
    const RIGHT = () => {
        addToCommandQueue('RIGHT');
        rotate(1);
    };

    const EXE = () => {
        setCommandQueue([]);
        setPosition(projectedPosition);
    }

    return {
        commandQueue,
        position,
        projectedPosition,
        commands: {
            PLACE,
            MOVE,
            LEFT,
            RIGHT,
            EXE,
        }
    }

};