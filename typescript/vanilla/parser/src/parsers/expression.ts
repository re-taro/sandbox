import { char } from '../characters'
import { cat, or, rep } from '../combinators'
import { map } from '../utils'
import { numbers } from './integer'
import type { ParserInput, ParserOutput } from '../types'

export function expr(input: ParserInput): ParserOutput<number> {
  return map(cat([term, rep(cat([or([char('+'), char('-')]), term]))]), ([head, rest]) => {
    return rest.reduce((lhs, [op, rhs]) => {
      if (op === '+') return lhs + rhs
      return lhs - rhs
    }, head)
  })(input)
}

function term(input: ParserInput): ParserOutput<number> {
  return map(cat([factor, rep(cat([or([char('*'), char('/')]), factor]))]), ([head, rest]) => {
    return rest.reduce((lhs, [op, rhs]) => {
      if (op === '*') return lhs * rhs
      return lhs / rhs
    }, head)
  })(input)
}

function factor(input: ParserInput): ParserOutput<number> {
  return or([numbers, map(cat([char('('), expr, char(')')]), ([, n]) => n)])(input)
}
