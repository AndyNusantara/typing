import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { GameMode, TimerState } from '../utils/types'
import { GAME_MODE } from '../utils/const'

export interface gameState {
	timer: number
	isTimerStart: boolean
	countdown: number
	endGame: boolean
	isBlur: boolean
	gameMode: string
}

const initialState: gameState = {
	timer: 0,
	isTimerStart: false,
	countdown: 60,
	endGame: false,
	isBlur: false,
	gameMode: GAME_MODE.COUNTDOWN
}

export const gameState = createSlice({
	name: 'gameState',
	initialState,
	reducers: {
		changeGameMode: (state, action: PayloadAction<GameMode>) => {
			state.gameMode = action.payload
		},
		changeCountdown: (state, action: PayloadAction<TimerState>) => {
			state.countdown = action.payload
		},
		startTimer: (state) => {
			state.timer += 1
		},
		startCountdown: (state) => {
			state.countdown -= 1
		},
		toggleTimer: (state) => {
			state.isTimerStart = !state.isTimerStart
		},
		resetTimer: (state) => {
			state.timer = 0
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
	changeCountdown,
	startTimer,
	toggleTimer,
	resetTimer,
	startCountdown,
	toggleGame,
	blur
} = gameState.actions

export default gameState.reducer
