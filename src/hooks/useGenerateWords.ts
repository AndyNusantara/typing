import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { generateWords, resetWordIndex } from '../slices/wordsSlice'
import useFocus from './useFocus'

export const useGenerateWords = () => {
	const dispatch = useDispatch()
	const { focusInput, inputRef } = useFocus()

	const generate = useCallback(
		(count: number) => {
			dispatch(generateWords(count))
			inputRef.current.value = ''
			dispatch(resetWordIndex())
			focusInput()
		},
		[dispatch, focusInput, inputRef]
	)

	return { generate }
}
