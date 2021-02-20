import React, { Component } from 'react'

export class App extends Component {
  state = {
    id: 'Start New',
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
    const board = await response.json()
    this.setState(boardSizer)
    this.setState(board)
  }

  handleLeftClick = async (row, column) => {
    const response = await fetch(
      `https://minesweeper-api.herokuapp.com/games/${this.state.id}/check`,
      {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          row: row,
          column: column,
        }),
      }
    )
    const move = await response.json()
    this.setState(move)
  }
  handleRightClick = async (row, column) => {
    const response = await fetch(
      `https://minesweeper-api.herokuapp.com/games/${this.state.id}/flag`,
      {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          row: row,
          column: column,
        }),
      }
    )
    const move = await response.json()
    this.setState(move)
  }

  changeShape = cell => {
    switch (cell) {
      case ' ':
        return ' '
      case '*':
        return '<i class="fas fa-bomb"></i>'
      case 'F':
        return 'F'
      case '@':
        return
      default:
        return cell
    }
  }

  render() {
    return (
      <div>
        <header>
          <h1>
            Minesweeper Game: {this.state.id} ({this.state.state})
          </h1>
        </header>
        <main className={this.state.boardSize}>
          <section>
            <ul>
              {this.state.board.map((row, rowIndex) =>
                row.map((cell, columnIndex) => (
                  <li
                    key={columnIndex}
                    onClick={() => this.handleLeftClick(rowIndex, columnIndex)}
                    onContextMenu={event => {
                      event.preventDefault()
                      this.handleRightClick(rowIndex, columnIndex)
                      return false
                    }}
                  >
                    {this.changeShape(cell)}
                  </li>
                ))
              )}
            </ul>
          </section>
          <aside>
            <h2>Some words</h2>
            <ul>
              <li>
                <strong>Key</strong>
              </li>
              <li>
                Left click to reveal a square, right click to place a flag
              </li>
              <li>" " - An unrevealed cell </li>
              <li>"_" - An empty revealed cell</li>
              <li>"F" - An unrevealed flagged cell</li>
              <li>"*" - A cell with a bomb in it</li>
              <li>"@" - A flagged cell with a bomb in it</li>
              <li>
                "1-8" - The number of neighboring cells that contain a mine.
              </li>
              <li>{this.state.mines} mines on the field</li>
            </ul>
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
          </aside>
        </main>
      </div>
    )
  }
}
