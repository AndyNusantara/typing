import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
	generateWords,
	resetPreviousInput,
	resetWordIndex
} from '../slices/wordsSlice'
import useFocus from './useFocus'
import { RootState } from '../store/store'
import { setTimer } from '../slices/gameStateSlice'

export const useGenerateWords = () => {
	const dispatch = useDispatch()
	const { focusInput, inputRef } = useFocus()
	const activeModeParameter = useSelector(
		(state: RootState) => state.gameState.modeParameter
	)
	const gameMode = useSelector((state: RootState) => state.gameState.gameMode)

	const generate = useCallback(
		(count?: number) => {
			if (count) {
				dispatch(generateWords(count))
			} else if (gameMode === 'words') {
				dispatch(generateWords(activeModeParameter))
				dispatch(setTimer(0))
			} else {
				dispatch(generateWords(200))
				dispatch(setTimer(activeModeParameter))
			}
			if (inputRef.current) {
				inputRef.current.value = ''
			}
			dispatch(resetPreviousInput())
			dispatch(resetWordIndex())
			focusInput()
		},
		[dispatch, focusInput, inputRef, activeModeParameter, gameMode]
	)

	return { generate }
}
