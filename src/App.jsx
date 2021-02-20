import React, { Component } from 'react'

export class App extends Component {
  state = {
    id: '',
    board: [
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    ],
    state: '',
    mines: 10,
    difficulty: 0,
    boardSize: 'small',
  }
  createNewGame = async level => {
    const boardSize = ''
    switch (level) {
      case 0:
        boardSize = 'small'
        break
      case 1:
        boardSize = 'medium'
        break
      case 2:
        boardSize = 'large'
      default:
        break
    }
    const boardSizer = { boardSize: boardSize }
    const response = await fetch(
      'https://minesweeper-api.herokuapp.com/games/',
      {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          difficulty: level,
        }),
      }
    )
    this.setState(boardSizer)
    this.setState(await response.json())
  }

  handleLeftClick = async (rowIndex, columnIndex) => {
    if (this.state.id === '') {
      this.createNewGame(0)
      return
    }
    const response = await fetch(
      `https://minesweeper-api.herokuapp.com/games/${this.state.id}/check`,
      {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          row: rowIndex,
          col: columnIndex,
        }),
      }
    )
    this.setState(await response.json())
  }
  handleRightClick = async (rowIndex, columnIndex) => {
    if (this.state.id === '') {
      this.createNewGame(0)
      return
    }
    const response = await fetch(
      `https://minesweeper-api.herokuapp.com/games/${this.state.id}/flag`,
      {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          row: rowIndex,
          col: columnIndex,
        }),
      }
    )
    this.setState(await response.json())
  }

  changeShape = (cell, rowIndex, columnIndex) => {
    switch (cell) {
      case '*':
        return (
          <li
            className="revealed"
            key={columnIndex}
            onClick={() => this.handleLeftClick(rowIndex, columnIndex)}
            onContextMenu={event => {
              event.preventDefault()
              this.handleRightClick(rowIndex, columnIndex)
              return false
            }}
          >
            <i className="fas fa-bomb"></i>
          </li>
        )
      case 'F':
        return (
          <li
            key={columnIndex}
            onClick={() => this.handleLeftClick(rowIndex, columnIndex)}
            onContextMenu={event => {
              event.preventDefault()
              this.handleRightClick(rowIndex, columnIndex)
              return false
            }}
          >
            <i className="far fa-flag"></i>
          </li>
        )
      case '@':
        return (
          <li
            className="revealed"
            key={columnIndex}
            onClick={() => this.handleLeftClick(rowIndex, columnIndex)}
            onContextMenu={event => {
              event.preventDefault()
              this.handleRightClick(rowIndex, columnIndex)
              return false
            }}
          >
            <i class="fas fa-flag"></i>
          </li>
        )
      case '_':
        return (
          <li
            className="revealed"
            key={columnIndex}
            onClick={() => this.handleLeftClick(rowIndex, columnIndex)}
            onContextMenu={event => {
              event.preventDefault()
              this.handleRightClick(rowIndex, columnIndex)
              return false
            }}
          ></li>
        )
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
      case 6:
      case 7:
      case 8:
        return (
          <li
            className="revealed"
            key={columnIndex}
            onClick={() => this.handleLeftClick(rowIndex, columnIndex)}
            onContextMenu={event => {
              event.preventDefault()
              this.handleRightClick(rowIndex, columnIndex)
              return false
            }}
          >
            {cell}
          </li>
        )
      default:
        return (
          <li
            key={columnIndex}
            onClick={() => this.handleLeftClick(rowIndex, columnIndex)}
            onContextMenu={event => {
              event.preventDefault()
              this.handleRightClick(rowIndex, columnIndex)
              return false
            }}
          >
            {cell}
          </li>
        )
    }
  }

  render() {
    return (
      <div>
        <header>
          <h1>Minesweeper Game: {this.state.id}</h1>
        </header>
        <main>
          <section>
            <ul className={this.state.boardSize}>
              {this.state.board.map((row, rowIndex) =>
                row.map((cell, columnIndex) =>
                  this.changeShape(cell, rowIndex, columnIndex)
                )
              )}
            </ul>
          </section>
          <aside>
            <h2>{this.state.state.toUpperCase()}</h2>
            <h3>{this.state.mines} mines left</h3>
            <nav>
              <ul>
                <li>
                  <strong>New Game</strong>
                </li>
                <li>
                  <button onClick={() => this.createNewGame(0)}>Easy</button>
                </li>
                <li>
                  <button onClick={() => this.createNewGame(1)}>Medium</button>
                </li>
                <li>
                  <button onClick={() => this.createNewGame(2)}>Hard</button>
                </li>
              </ul>
              <ul>
                <li>
                  <strong>Find Game</strong>
                </li>
                <li>
                  <input type="textbox" value="Out Of Order" readOnly />
                </li>
              </ul>
            </nav>
            <ul>
              <li>
                <strong>Key</strong>
              </li>
              <li>
                Left click to reveal a square, right click to place a flag
              </li>
              <li>
                An unrevealed cell is dark grey. A revealed cell is light grey
              </li>
              <li>
                "1-8" is the number of neighboring cells that contain a mine
              </li>
              <li>
                You place outlined flags. Black flags are one's that had a bomb
                under them
              </li>
            </ul>
          </aside>
        </main>
      </div>
    )
  }
}
