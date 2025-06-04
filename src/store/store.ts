import { configureStore } from '@reduxjs/toolkit'
import wordsReducer from '../slices/wordsSlice'
import gameStateReducer from '../slices/gameStateSlice'

export const store = configureStore({
	reducer: {
		words: wordsReducer,
		gameState: gameStateReducer
	}
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
