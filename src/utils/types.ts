export type LetterState =
	| 'correct'
	| 'incorrect'
	| 'untyped'
	| 'active'
	| 'active is-last correct'
	| 'active is-last incorrect'

export type TimerState = 60 | 30 | 20

export type GameMode = 'countdown' | 'timer'
