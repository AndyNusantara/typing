import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { generate } from 'random-words'
import {
	ChangeLetterStatePayload,
	ChangeWordStatePayload,
	LetterState
} from '../utils/types'

interface wordsState {
	words: string[]
	wordState: string[]
	wordIndex: number
	letterState: string[][]
}

const initialState: wordsState = {
	words: [],
	wordState: [],
	wordIndex: 0,
	letterState: []
}

export const wordsSlice = createSlice({
	name: 'words',
	initialState,
	reducers: {
		generateWords: (state, action: PayloadAction<number>) => {
			const words = generate(action.payload) as string[]

			const initialLetterState = words.map((word) =>
				[...word].map(() => 'untyped' as LetterState)
			)
			initialLetterState[0][0] = 'active'

			const initialWordState = words.map(() => 'untyped')
			initialWordState[0] = 'active'

			state.words = words
			state.wordState = initialWordState
			state.letterState = initialLetterState
		},
		changeLetterState: (
			state,
			action: PayloadAction<ChangeLetterStatePayload>
		) => {
			state.letterState[action.payload.wordIndex][action.payload.letterIndex] =
				action.payload.newState
		},
		changeWordState: (state, action: PayloadAction<ChangeWordStatePayload>) => {
			state.wordState[action.payload.index] = action.payload.state
		},
		incrementWordIndex: (state) => {
			state.wordIndex += 1
		},
		resetWordIndex: (state) => {
			state.wordIndex = 0
		}
	}
})

export const {
	generateWords,
	changeLetterState,
	changeWordState,
	incrementWordIndex,
	resetWordIndex
} = wordsSlice.actions

export default wordsSlice.reducer
