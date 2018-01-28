// @flow
import * as React from 'react'
import ReactDOM from 'react-dom'
import { mount } from 'enzyme'
import App from './App'

const sel = (id: string) => `[data-test="${id}"]`

function setup(props = {}) {
  const wrapper = mount(<App {...props} />)
  const input = wrapper.find(sel('input'))
  setFile(wrapper)

  return { wrapper }
}

function setFile(wrapper) {
  const fileContents = `
1,test,hoge
2,test,fuga
  `
  const file = new File([fileContents], 'dymmy.csv', { type: 'text/csv' })
  wrapper.setState({ file, isParseFinish: true })
}

test('読み込み開始ボタンは、クリックすると完了と表示される', done => {
  const { wrapper } = setup()
  wrapper.find(sel('button')).simulate('click')
  setTimeout(() => {
    expect(wrapper.find(sel('button')).text()).toBe('完了')
    done()
  }, 300)
})

test('ファイル名が表示されること', () => {
  const { wrapper } = setup()
  wrapper.setState({ name: 'dummy.csv' })
  expect(wrapper.find(sel('filename')).text()).toBe('dummy.csv')
})

test('カラム数が表示されること', () => {
  const { wrapper } = setup()
  wrapper.setState({ column: 3, isParseFinish: true })
  expect(wrapper.find(sel('column')).text()).toBe('3')
})

test('データ数が表示されること', () => {
  const { wrapper } = setup()
  wrapper.setState({ row: 3, isParseFinish: true })
  expect(wrapper.find(sel('row')).text()).toBe('3')
})

test('重さが表示されること', () => {
  const { wrapper } = setup()
  wrapper.setState({ size: 27, isParseFinish: true })
  expect(wrapper.find(sel('size')).text()).toBe('27')
})
