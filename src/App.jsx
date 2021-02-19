import React, { Component } from 'react'

export class App extends Component {
  state = createNewGame()

  createNewGame = async =>
    async function createOneListItem() {
      const response = await fetch(
        'https://minesweeper-api.herokuapp.com/games/',
        {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
        }
      )
      this.setState(response.json())
    }

  handleLeftClick = async (row, column) => {
    console.log('clicked!')
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
    this.setState(response.json())
  }
  handleRightClick = async (row, column) => {
    console.log('right clicked')
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
    this.setState(response.json())
  }

  createNewGame = () => {}
  render() {
    return (
      <div>
        <header>
          <h1>Minesweeper</h1>
        </header>
        <main>
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
                    {cell}
                  </li>
                ))
              )}
            </ul>
          </section>
          <aside>
            <h2>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi
              laborum inventore maiores soluta. Id sint quasi, laudantium sed
              praesentium reprehenderit. Adipisci esse quisquam optio ipsam
              dignissimos, quasi deserunt! Vero, inventore?
            </h2>
            <nav>
              <ul>
                <li>New Game</li>
                <li>
                  <ul>
                    <li>
                      <button onclick={this.createNewGame}>Easy</button>
                    </li>
                    <li>
                      <button>Medium</button>
                    </li>
                    <li>
                      <button>Hard</button>
                    </li>
                  </ul>
                </li>
              </ul>
            </nav>
          </aside>
        </main>
      </div>
    )
  }
}
