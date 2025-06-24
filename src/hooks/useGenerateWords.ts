import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { generateWords, resetWordIndex } from '../slices/wordsSlice'
import useFocus from './useFocus'
import { RootState } from '../store/store'

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
			} else {
				dispatch(generateWords(200))
			}
			if (inputRef.current) {
				inputRef.current.value = ''
			}
			dispatch(resetWordIndex())
			focusInput()
		},
		[dispatch, focusInput, inputRef, activeModeParameter, gameMode]
	)

	return { generate }
}
