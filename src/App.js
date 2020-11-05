import './App.css';
import { useRobot } from './hooks/useRobot';
import { Board } from './components/Board';
import { isEmpty } from 'lodash';
import { CommandQueue } from './components/CommandQueue';
import { BEARING_LABEL } from './utils';
import { Controls } from './components/Controls';

function App() {
  const {
    position,
    projectedPosition,
    commands,
    commandQueue,
  } = useRobot();

  const handleReport = () => {
    commands.EXE();
    window.alert([
      projectedPosition.x, 
      projectedPosition.y, 
      BEARING_LABEL[projectedPosition.f]
    ].join(', '));
  };

  return (
    <div className="App">
      <div className="container">
          <div className="commandQueue">
            <CommandQueue commands={commandQueue} />
          </div>
          <div className="board">
            <Board
              position={position}
              projectedPosition={projectedPosition}
              onPlace={commands.PLACE}
            />
          </div>
          <div className="controls">
            <Controls 
              isReady={isEmpty(position)}
              onLeft={commands.LEFT}
              onRight={commands.RIGHT}
              onMove={commands.MOVE}
              onGo={handleReport}
             />
          </div>
          
      </div>
    </div>
  );
}

export default App;
