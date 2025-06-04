import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { generate } from 'random-words'
import { LetterState } from '../utils/types'

export interface wordsState {
	words: string[]
	letterState: string[][]
}

const initialState: wordsState = {
	words: [],
	letterState: []
}

export const wordsSlice = createSlice({
	name: 'words',
	initialState,
	reducers: {
		generateWords: (state) => {
			const words = generate(20) as string[]

			const initialLetterState = words.map((word) =>
				[...word].map(() => 'untyped' as LetterState)
			)
			initialLetterState[0][0] = 'active'

			state.words = words
			state.letterState = initialLetterState
		},
		changeLetterState: (
			state,
			action: PayloadAction<{
				wordIndex: number
				letterIndex: number
				newState: LetterState
			}>
		) => {
			state.letterState[action.payload.wordIndex][action.payload.letterIndex] =
				action.payload.newState
		}
	}
})

export const { generateWords, changeLetterState } = wordsSlice.actions

export default wordsSlice.reducer
