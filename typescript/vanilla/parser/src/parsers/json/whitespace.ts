import { char } from '../../characters'
import { or, rep } from '../../combinators'
import { map } from '../../utils'
import type { Parser } from '../../types'

export const whitespace: Parser<null> = map(rep(or([...'\t\n\r '].map(char))), () => null)
