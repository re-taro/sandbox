import { char, digit } from '../characters'
import { diff, map, opt } from '../utils'
import { cat, or, rep } from '../combinators'
import type { Digit } from '../characters'
import type { Parser } from '../types'

const nonZeroDigit: Parser<Digit> = diff(digit, char('0'))

const zeroNumber: Parser<0> = map(char('0'), () => 0)

const nonZeroNumber: Parser<number> = map(cat([nonZeroDigit, rep(digit)]), ([head, rest]) => Number.parseInt([head, ...rest].join(''), 10))

export const numbers: Parser<number> = or([zeroNumber, nonZeroNumber])

const sign: Parser<1 | -1> = map(opt(or([char('+'), char('-')])), s => s.status === 'some' ? s.value === '+' ? 1 : -1 : 1)

export const int: Parser<number> = map(cat([sign, numbers]), ([s, n]) => s * n)
