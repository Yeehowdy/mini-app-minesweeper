import { useState, useEffect } from "react";
import { Row, Col, Container, Modal } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

function Board(props) {
  const [board, setBoard] = useState([]);
  const [gameOver, setGameOver] = useState(false)
  const [safeCells, setSafeCells] = useState(1)
  const [bombCells, setBombCells] = useState(1)
  // const [runningTime, setRunningTime] = useState()
  // const [startTime, setStartTime] = useState()

  useEffect(() => {
    let newBoard = [];
    let bombCount = 0;
    for(let x=0; x < props.config.rows; x++){
      let newRow = []
      for(let y=0;y<props.config.cols;y++){
        let cell = {isBomb: false, isClicked: false, flaggable: true}
        // let bombRoll = Math.round(Math.random(1) * 10)
        // if(bombRoll > 7 && bombCount < 30){
        //   cell.isBomb = true
        //   bombCount++
        // }
        newRow.push(cell)
      }
      newBoard.push(newRow)
    }
    // setInterval(() => {setRunningTime(Date.now() - startTime)}, 200)
    setBombCells(bombCount)
    setSafeCells(100-bombCount)
    // setStartTime(Date.now())
    // setRunningTime(null)
    setBoard(newBoard)
  }, [gameOver])

  const makeMines = (mines) => {
    let minesLeft = mines
    let rows = board.length - 1
    let cols = board[0].length - 1

  }

  const flagCell = (row, col) => {
    let mutatedBoard = [...board]
    let cell = mutatedBoard[row][col]
    if(cell.flaggable){
      if(cell.adjacentCells == 'F'){
        cell.isClicked = false
        cell.adjacentCells = null
        setBombCells(bombCells +1)
      }
      else{
        cell.isClicked = true
        cell.adjacentCells = 'F'
        setBombCells(bombCells -1)
      }
      
      setBoard(mutatedBoard)
    }
    
    
  }

  const cellCheck = (row, col) => {
    let mutatedBoard = [...board]
    let cell = mutatedBoard[row][col]
    cell.isClicked = true;
    cell.flaggable = false;
    if(cell.isBomb){
      setGameOver(true)
      console.log('BOOM! Game over')
      cell.adjacentCells = 'BOOM!'
    }
    else{
      let count = 0;
      setSafeCells(safeCells-1)
      for(let x=row-1;x<2+row;x++){
        if(x >= 0 && x < mutatedBoard.length)
        for(let y=col-1;y<2+col;y++){
          if(y >= 0 && y < mutatedBoard[x].length && mutatedBoard[x][y].isBomb){
            count++
          }
        }
      }
      mutatedBoard[row][col].adjacentCells = count
      if(safeCells == 0){
        console.log('You win!!!!!')
      }
    }
    setBoard(mutatedBoard)
  }

  

  return (
    <Container className="w-75">
      <h3 className="text-center">{safeCells} safe cells remain</h3>
      <h3 className="text-center">{bombCells} bombs remain</h3>
      {/* <h3 className="text-center">{runningTime}</h3> */}
      {board.map((row, rowIndex) => 
        (
        <Row key={rowIndex}>
          {row.map((cell, colIndex) => 
            (<Col className="border" key={[rowIndex, colIndex]} >
              <button className="w-100 h-100" onClick={() => cellCheck(rowIndex, colIndex)} onContextMenu={(e) => {e.preventDefault();flagCell(rowIndex, colIndex)}} disabled={cell.isClicked}>
                {cell.isClicked || cell.adjacentCells ? cell.adjacentCells : '' }
              </button>
            </Col>)
          )}
        </Row>
        )
      )}
    </Container>
  );
}

export default Board;
