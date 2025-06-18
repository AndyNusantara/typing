import { ReactElement } from 'react'

export type LetterState =
	| 'correct'
	| 'incorrect'
	| 'untyped'
	| 'active'
	| 'active is-last correct'
	| 'active is-last incorrect'

export type WordState =
	| 'untyped'
	| 'correct typed'
	| 'incorrect typed'
	| 'active'

export type ChangeLetterStatePayload = {
	wordIndex: number
	letterIndex: number
	newState: LetterState
}

export type ChangeWordStatePayload = {
	state: WordState
	index: number
}

export type Parameter = 60 | 30 | 15

export type GameMode = 'timer' | 'words'

export type ToolsType = 'game-mode' | 'mode-parameter'

export type Tools = {
	component: ReactElement
	key: string
	type: ToolsType
}
