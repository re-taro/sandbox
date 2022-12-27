import { array, object, value } from './value'
import type { ObjectType, ValueType } from './value'
import type { ParserOutput } from '../../types'

describe('value', () => {
  const parser = value
  test('Empty input', () => {
    const input = [] as const
    const output = parser(input)
    expect(output).toEqual<ParserOutput<ValueType>>({
      result: 'fail',
    })
  })
  test('Input "hello"', () => {
    const input = [...'hello']
    const output = parser(input)
    expect(output).toEqual<ParserOutput<ValueType>>({
      result: 'fail',
    })
  })
  test('Input ""hello""', () => {
    const input = [...'"hello"']
    const output = parser(input)
    expect(output).toEqual<ParserOutput<ValueType>>({
      result: 'success',
      data: 'hello',
      rest: [],
    })
  })
  test('Input "\t"hello"\t"', () => {
    const input = [...'\t"hello"\t']
    const output = parser(input)
    expect(output).toEqual<ParserOutput<ValueType>>({
      result: 'success',
      data: 'hello',
      rest: [],
    })
  })
  test('Input "42"', () => {
    const input = [...'42']
    const output = parser(input)
    expect(output).toEqual<ParserOutput<ValueType>>({
      result: 'success',
      data: 42,
      rest: [],
    })
  })
  test('Input "true"', () => {
    const input = [...'true']
    const output = parser(input)
    expect(output).toEqual<ParserOutput<ValueType>>({
      result: 'success',
      data: true,
      rest: [],
    })
  })
  test('Input "false"', () => {
    const input = [...'false']
    const output = parser(input)
    expect(output).toEqual<ParserOutput<ValueType>>({
      result: 'success',
      data: false,
      rest: [],
    })
  })
  test('Input "null"', () => {
    const input = [...'null']
    const output = parser(input)
    expect(output).toEqual<ParserOutput<ValueType>>({
      result: 'success',
      data: null,
      rest: [],
    })
  })
  test('Input "[1, 2, 3]"', () => {
    const input = [...'[1, 2, 3]']
    const output = parser(input)
    expect(output).toEqual<ParserOutput<ValueType>>({
      result: 'success',
      data: [1, 2, 3],
      rest: [],
    })
  })
  test('Input "{ "answer": 42, "absolute-zero": -273.15 }"', () => {
    const input = [...'{ "answer": 42, "absolute-zero": -273.15 }']
    const output = parser(input)
    expect(output).toEqual<ParserOutput<ValueType>>({
      result: 'success',
      data: { 'answer': 42, 'absolute-zero': -273.15 },
      rest: [],
    })
  })
})

describe('array', () => {
  const parser = array
  test('Empty input', () => {
    const input = [] as const
    const output = parser(input)
    expect(output).toEqual<ParserOutput<ValueType[]>>({
      result: 'fail',
    })
  })
  test('Input "hello"', () => {
    const input = [...'hello']
    const output = parser(input)
    expect(output).toEqual<ParserOutput<ValueType[]>>({
      result: 'fail',
    })
  })
  test('Input "[]"', () => {
    const input = [...'[]']
    const output = parser(input)
    expect(output).toEqual<ParserOutput<ValueType[]>>({
      result: 'success',
      data: [],
      rest: [],
    })
  })
  test('Input "[1]"', () => {
    const input = [...'[1]']
    const output = parser(input)
    expect(output).toEqual<ParserOutput<ValueType[]>>({
      result: 'success',
      data: [1],
      rest: [],
    })
  })
  test('Input "[1, "2", false, null]"', () => {
    const input = [...'[1, "2", false, null]']
    const output = parser(input)
    expect(output).toEqual<ParserOutput<ValueType[]>>({
      result: 'success',
      data: [1, '2', false, null],
      rest: [],
    })
  })
})

describe('object', () => {
  const parser = object
  test('Empty input', () => {
    const input = [] as const
    const output = parser(input)
    expect(output).toEqual<ParserOutput<ObjectType>>({
      result: 'fail',
    })
  })
  test('Input "hello"', () => {
    const input = [...'hello']
    const output = parser(input)
    expect(output).toEqual<ParserOutput<ObjectType>>({
      result: 'fail',
    })
  })
  test('Input "{}"', () => {
    const input = [...'{}']
    const output = parser(input)
    expect(output).toEqual<ParserOutput<ObjectType>>({
      result: 'success',
      data: {},
      rest: [],
    })
  })
  test('Input "{ "answer-to-the-ultimate-question": 42 }"', () => {
    const input = [...'{ "answer-to-the-ultimate-question": 42 }']
    const output = parser(input)
    expect(output).toEqual<ParserOutput<ObjectType>>({
      result: 'success',
      data: { 'answer-to-the-ultimate-question': 42 },
      rest: [],
    })
  })
  test('Input "{ "number": 1, "string": "hello", "boolean": true, "null": null }"', () => {
    const input = [...'{ "number": 1, "string": "hello", "boolean": true, "null": null }']
    const output = parser(input)
    expect(output).toEqual<ParserOutput<ObjectType>>({
      result: 'success',
      data: { number: 1, string: 'hello', boolean: true, null: null },
      rest: [],
    })
  })
})
