import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { GameMode, Parameter } from '../utils/types'

export interface gameState {
	timer: number
	isTimerStart: boolean
	modeParameter: number
	endGame: boolean
	isBlur: boolean
	gameMode: GameMode
}

const initialState: gameState = {
	timer: 60,
	isTimerStart: false,
	modeParameter: 60,
	endGame: false,
	isBlur: false,
	gameMode: 'timer'
}

export const gameState = createSlice({
	name: 'gameState',
	initialState,
	reducers: {
		changeGameMode: (state, action: PayloadAction<GameMode>) => {
			state.gameMode = action.payload
		},
		changeModeParameter: (state, action: PayloadAction<Parameter>) => {
			state.modeParameter = action.payload
		},
		incrementTimer: (state) => {
			state.timer += 1
		},
		decrementTimer: (state) => {
			state.timer -= 1
		},
		startCountdown: (state) => {
			state.modeParameter -= 1
		},
		startTimer: (state) => {
			state.isTimerStart = true
		},
		stopTimer: (state) => {
			state.isTimerStart = false
		},
		resetTimer: (state) => {
			state.timer = state.modeParameter
			state.isTimerStart = false
		},
		setTimer: (state, action: PayloadAction<number>) => {
			state.timer = action.payload
		},
		toggleGame: (state) => {
			state.endGame = !state.endGame
		},
		blur: (state) => {
			state.isBlur = !state.isBlur
		}
	}
})

export const {
	changeGameMode,
	changeModeParameter,
	incrementTimer,
	decrementTimer,
	startTimer,
	stopTimer,
	resetTimer,
	setTimer,
	startCountdown,
	toggleGame,
	blur
} = gameState.actions

export default gameState.reducer
