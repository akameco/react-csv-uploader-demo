// @flow
import fs from 'fs'
import path from 'path'
import * as React from 'react'
import ReactDOM from 'react-dom'
import { mount } from 'enzyme'
import App, { csvToArray } from './App'

const sel = (id: string) => `[data-test="${id}"]`

function setup(props = {}) {
  const wrapper = mount(<App {...props} />)
  const button = wrapper.find(sel('button'))

  return {
    wrapper,
    button
  }
}

test('読み込み開始ボタンが表示されていること', () => {
  const { button } = setup()
  expect(button.text()).toBe('読み込み開始')
})

test('読み込み完了までファイル名、カラム数、データ数、重さが表示されないこと', () => {
  const { wrapper } = setup()
  const textbox = wrapper.find(sel('textbox'))
  expect(textbox.exists()).toBe(false)
})

test('フォームが表示されること', () => {
  const { wrapper } = setup()
  const form = wrapper.find(sel('form'))
  expect(form.exists()).toBe(true)
})

test('ファイルが入力されるまで読み込み開始はdisabled', () => {
  const { wrapper } = setup()
  expect(wrapper.find('button').prop('disabled')).toBe(true)
  wrapper.setState({ fileLoaded: true })
  expect(wrapper.find(sel('button')).prop('disabled')).toBe(false)
})

test('csvToArray', () => {
  const dummy = `
a,1
b,2
c,2
  `
  expect(csvToArray(dummy)).toEqual({
    row: 3,
    column: 2,
    data: [['a', '1'], ['b', '2'], ['c', '2']]
  })
})
