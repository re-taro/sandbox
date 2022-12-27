import { anyChar } from '../../primitives'
import { char, digit, is } from '../../characters'
import { cat, or, rep } from '../../combinators'
import { diff, map, str } from '../../utils'
import type { Digit } from '../../characters'
import type { Parser } from '../../types'

const cntrl: Parser<string> = is((c): c is string => (c.codePointAt(0) || 0) <= 0x1F)

type HexUpperAlpha = 'A' | 'B' | 'C' | 'D' | 'E' | 'F'

type HexLowerAlpha = Lowercase<HexUpperAlpha>

type HexAlpha = HexUpperAlpha | HexLowerAlpha

type HexDigit = Digit | HexAlpha

const hex: Parser<HexDigit> = or([digit, is((c): c is HexAlpha => /^[A-Fa-f]$/.test(c))])

const codePoint: Parser<string> = map(cat([str('\\u'), rep(hex, 4, 4)]), ([, code]) => String.fromCodePoint(Number.parseInt(code.join(''), 16)))

const escape: Parser<string> = or([
  map(str('\\b'), () => '\b'),
  map(str('\\t'), () => '\t'),
  map(str('\\n'), () => '\n'),
  map(str('\\f'), () => '\f'),
  map(str('\\r'), () => '\r'),
  map(str('\\"'), () => '"'),
  map(str('\\/'), () => '/'),
  map(str('\\\\'), () => '\\'),
  codePoint,
])

const stringContent: Parser<string> = map(rep(or([
  diff(anyChar, or([char('"'), char('\\'), cntrl])),
  escape,
])), strs => strs.join(''))

export const string: Parser<string> = map(cat([char('"'), stringContent, char('"')]), ([, s]) => s)
