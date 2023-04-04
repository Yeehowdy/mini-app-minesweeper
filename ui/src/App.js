import Board from "./Board";
import { useState, useContext, createContext } from "react";


function App() {
  const [gameConfig, setGameConfig] = useState({rows: 10, cols: 10, mines: 30})
  const [isPlaying, setIsPlaying] = useState(false)

  const handleChange = (type, value) => {
    let changedGameCongig = {...gameConfig,}
    changedGameCongig[type] = value;
    setGameConfig(changedGameCongig)
  }

  return (
    <div className="App">
      <input className="w-25" type="number" min={3} max={30} placeholder="# of Rows" onChange={(e) => handleChange("rows", e.target.value)} disabled={isPlaying}/>
      <input className="w-25" type="number" min={3} max={30} placeholder="# of Cols" onChange={(e) => handleChange("cols", e.target.value)} disabled={isPlaying}/>
      <input className="w-25" type="number" min={3} max={(gameConfig.rows * gameConfig.cols) - 1} placeholder="# of Mines" onChange={(e) => handleChange("mines", e.target.value)} disabled={isPlaying}/>
      <button className="w-25" onClick={() => setIsPlaying(true)} disabled={isPlaying}>Start Game</button>
      {isPlaying ? (<Board config={gameConfig}/>) : ''}
      
    </div>
  );
}



export default App;
