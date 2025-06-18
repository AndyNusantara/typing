import { LetterState } from './types'

export const LETTER_STATES = {
	CORRECT: 'correct' as LetterState,
	INCORRECT: 'incorrect' as LetterState,
	UNTYPED: 'untyped' as LetterState,
	ACTIVE: 'active' as LetterState,
	LAST_CORRECT: 'active is-last correct' as LetterState,
	LAST_INCORRECT: 'active is-last incorrect' as LetterState
}

export const GAME_MODE = {
	WORDS: 'words',
	TIMER: 'timer'
}
