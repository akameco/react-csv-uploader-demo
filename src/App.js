// @flow
import * as React from 'react'
import Dropzone from 'react-dropzone'
import './App.css'

type CsvData = {
  row: number,
  column: number,
  data: string[][]
}

// TODO 本来はちゃんとしたパーサを使うべき
export function csvToArray(text: string): CsvData {
  const lines = text.trim().split('\n')
  const data = lines.map(line => line.split(','))
  const column = data[0] ? data[0].length : 0
  return { data, column, row: lines.length }
}

type State = {
  name: ?string,
  size: number,
  column: number,
  row: number,
  isParseFinish: boolean,
  fileLoaded: boolean,
  file: any
}

class App extends React.Component<{}, State> {
  state = {
    name: null,
    size: 0,
    column: 0,
    row: 0,
    fileLoaded: false,
    isParseFinish: false,
    file: null
  }

  handleParseCsv = (file: *) => {
    const reader = new FileReader()

    reader.addEventListener('load', () => {
      const { result } = reader
      if (typeof result === 'string') {
        const { column, row } = csvToArray(result)
        this.setState({ column, row, isParseFinish: true })
      }
    })
    reader.readAsText(file)

    const { name, size } = file
    this.setState({ name, size })
  }

  handleChange = (ev: *) => {
    const file = ev.target.files[0]
    if (!file) {
      return
    }

    this.setState({ file, fileLoaded: true })
  }

  handleClick = () => {
    const { file } = this.state
    if (file) {
      this.handleParseCsv(file)
    }
  }

  handleDrop = (files: Array<*>) => {
    const file = files[0]
    if (!file) {
      return
    }
    this.setState({ file, fileLoaded: true })
  }

  render() {
    const { name, size, row, column, isParseFinish } = this.state

    return (
      <div className="App">
        {!isParseFinish && (
          <Dropzone data-test="form" onDrop={this.handleDrop}>
            ここにファイルにドラックアンドドロップ
          </Dropzone>
        )}
        {isParseFinish && (
          <div data-test="textbox">
            <div>
              ファイル名は <div data-test="filename">{name}</div>
            </div>
            <div>
              カラム数は <div data-test="column">{column}</div>
            </div>
            <div>
              データ数は <div data-test="row">{row}</div>
            </div>
            <div>
              重さは<div data-test="size">{size}</div>
            </div>
          </div>
        )}
        <button
          data-test="button"
          disabled={!this.state.fileLoaded}
          onClick={this.handleClick}
        >
          {isParseFinish ? '完了' : '読み込み開始'}
        </button>
      </div>
    )
  }
}

export default App
